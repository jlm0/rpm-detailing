import type { AppearsOnProps } from '@/fields/appears-on'

export function AppearsOn({ trail, where, outline }: AppearsOnProps) {
  return (
    <div className="appears-on">
      {outline && (
        <ol className="appears-on__outline" aria-hidden>
          {outline.items.map((item, index) => (
            <li
              key={item}
              title={item}
              className={index === outline.active ? 'appears-on__block--active' : undefined}
            />
          ))}
        </ol>
      )}
      <div>
        <p className="appears-on__trail">
          <span className="appears-on__eyebrow">Appears on</span> {trail}
        </p>
        <p className="appears-on__where">{where}</p>
      </div>
    </div>
  )
}
