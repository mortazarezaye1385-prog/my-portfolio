"use client";

import { AlertCircle, Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { sendContact, validateContact, type ContactErrors, type ContactField, type ContactPayload } from "@/lib/contact";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: ContactPayload = { name: "", email: "", message: "" };
const FIELDS: { name: ContactField; label: string; type: "text" | "email" | "textarea"; autoComplete: string; placeholder: string }[] = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name", placeholder: "Ada Lovelace" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "ada@company.com" },
  { name: "message", label: "About the project", type: "textarea", autoComplete: "off", placeholder: "What are you building, and when would you like to launch?" },
];

export function ContactForm() {
  const formId = useId();
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [via, setVia] = useState<"endpoint" | "mailto">("endpoint");

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateContact(next)[field] }));
  }

  function onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    if (!values[field]) return; // don't scold people for tabbing through
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateContact(values)[field] }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    // Honeypot: bots fill every field; humans never see this one.
    const trap = form.elements.namedItem("company");
    if (trap instanceof HTMLInputElement && trap.value) {
      setStatus("success");
      return;
    }

    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = FIELDS.find((field) => found[field.name]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    const result = await sendContact(values);
    if (result.ok) {
      setVia(result.via);
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
    } else {
      setServerError(result.error);
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("input")?.focus());
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: ease.outExpo }}
            className="flex min-h-[30rem] flex-col items-start justify-center border-t border-line pt-10"
          >
            <svg aria-hidden="true" viewBox="0 0 56 56" className="size-14 text-accent">
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: ease.outExpo }}
              />
              <motion.path
                d="M18 29 l7 7 l13 -15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: ease.outExpo, delay: 0.35 }}
              />
            </svg>
            <h3 className="display-3 mt-8">{via === "mailto" ? "Almost there." : "Message sent."}</h3>
            <p className="mt-3 max-w-[40ch] text-muted">
              {via === "mailto"
                ? "Your email app should have opened with the message ready to go. Hit send and I'll reply within two working days."
                : "Thanks for reaching out. I read every message and reply within two working days."}
            </p>
            <button type="button" onClick={reset} className={buttonClasses("secondary", "md", "mt-8")}>
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            aria-describedby={serverError ? `${formId}-server` : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {FIELDS.map((field) => {
              const id = `${formId}-${field.name}`;
              const error = touched[field.name] ? errors[field.name] : undefined;
              const valid = touched[field.name] && !errors[field.name] && values[field.name].length > 0;
              const control = cn(
                "peer w-full rounded-none border-0 border-b bg-transparent px-0 text-lg text-fg outline-none transition-colors duration-300 placeholder:text-subtle/70",
                "focus-visible:outline-none",
                error ? "border-danger" : "border-line-strong focus:border-accent",
              );
              const shared = {
                id,
                name: field.name,
                value: values[field.name],
                onChange,
                onBlur,
                autoComplete: field.autoComplete,
                placeholder: field.placeholder,
                required: true,
                "aria-invalid": error ? true : undefined,
                "aria-describedby": error ? `${id}-error` : undefined,
              } as const;

              return (
                <div key={field.name} className="relative">
                  <label htmlFor={id} className="eyebrow block">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea {...shared} rows={5} maxLength={4000} className={cn(control, "mt-2 min-h-36 resize-y py-3 leading-relaxed")} />
                  ) : (
                    <input {...shared} type={field.type} className={cn(control, "mt-2 h-14")} />
                  )}
                  {/* Focus underline that grows from the left */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo peer-focus:scale-x-100"
                  />
                  {valid ? (
                    <Check aria-hidden="true" className="absolute right-0 top-10 size-4 text-success" />
                  ) : null}
                  <AnimatePresence initial={false}>
                    {error ? (
                      <motion.p
                        id={`${id}-error`}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute -bottom-7 left-0 flex items-center gap-1.5 text-sm text-danger"
                      >
                        <AlertCircle aria-hidden="true" className="size-3.5" />
                        {error}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${formId}-company`}>Company</label>
              <input id={`${formId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "submitting"}
                aria-busy={status === "submitting"}
                className={buttonClasses("primary", "lg", "min-w-48")}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                    <span>Sending</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <AnimatedArrow direction="up-right" />
                  </>
                )}
              </button>
              <p className="meta">Replies within two working days.</p>
            </div>

            <p id={`${formId}-server`} role="alert" className={cn("text-sm text-danger", !serverError && "sr-only")}>
              {serverError}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
