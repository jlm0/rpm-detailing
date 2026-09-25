export function Logo() {
  return (
    <span className="rpm-logo" role="img" aria-label="RPM Detailing">
      <span className="rpm-logo__mark" aria-hidden>
        RPM
      </span>
      <span className="rpm-logo__word" aria-hidden>
        Detailing
      </span>
    </span>
  )
}

export function Icon() {
  return (
    <svg className="rpm-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#d9232d" />
      <path
        d="M8 18V6h4.6c2.5 0 4 1.3 4 3.5 0 1.6-.8 2.7-2.2 3.2L17 18h-2.9l-2.2-4.9H10.6V18H8Zm2.6-7h1.8c1 0 1.6-.5 1.6-1.4 0-.9-.6-1.4-1.6-1.4h-1.8V11Z"
        fill="#fff"
      />
    </svg>
  )
}
