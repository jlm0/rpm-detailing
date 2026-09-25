const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function Price({ amount, suffix }: { amount: number; suffix?: string | null }) {
  return (
    <>
      {currency.format(amount)}
      {suffix && <span className="text-[0.55em] tracking-normal">{suffix}</span>}
    </>
  )
}
