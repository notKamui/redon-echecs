import React from 'react'

type InputProps = {
  attribute: { type: string; customField: string }
  description?: any
  placeholder?: any
  hint?: string
  name: string
  intlLabel: any
  onChange: (args: {
    target: { name: string; type: string; value: unknown }
  }) => void
  contentTypeUID: string
  type: string // custom field uid
  value: unknown // should be an array of rows or object
  required?: boolean
  error?: any
  disabled?: boolean
}

// A very lightweight table editor that stores value as JSON: { headers: string[], rows: string[][] }
const TableInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { attribute, disabled, intlLabel, name, onChange, required, value } =
      props

    type TableValue = { headers: string[]; rows: string[][] }
    const parsed: TableValue = React.useMemo(() => {
      if (value && typeof value === 'object') return value as TableValue
      return { headers: ['Column 1', 'Column 2'], rows: [['', '']] }
    }, [value])

    const update = (next: TableValue) => {
      onChange({ target: { name, type: attribute.type, value: next } })
    }

    const setHeader = (i: number, text: string) => {
      const headers = [...parsed.headers]
      headers[i] = text
      update({ ...parsed, headers })
    }

    const setCell = (r: number, c: number, text: string) => {
      const rows = parsed.rows.map((row, ri) =>
        ri === r ? row.map((v, ci) => (ci === c ? text : v)) : row,
      )
      update({ ...parsed, rows })
    }

    const addColumn = () => {
      const headers = [...parsed.headers, `Column ${parsed.headers.length + 1}`]
      const rows = parsed.rows.map((row) => [...row, ''])
      update({ ...parsed, headers, rows })
    }

    const addRow = () => {
      const rows = [...parsed.rows, new Array(parsed.headers.length).fill('')]
      update({ ...parsed, rows })
    }

    const labelId = React.useId()

    return (
      <div>
        <fieldset style={{ border: 'none', padding: 0 }}>
          <legend id={labelId} style={{ display: 'block', marginBottom: 8 }}>
            {typeof intlLabel === 'object'
              ? intlLabel?.defaultMessage || intlLabel?.id || name || 'Table'
              : String(intlLabel ?? name ?? 'Table')}
          </legend>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {parsed.headers.map((h, i) => (
                    <th
                      key={i}
                      style={{
                        border: '1px solid #ddd',
                        padding: 8,
                        background: '#fafafa',
                      }}
                    >
                      <input
                        ref={i === 0 ? (ref as any) : undefined}
                        type="text"
                        disabled={disabled}
                        required={required}
                        value={h}
                        onChange={(e) =>
                          setHeader(i, (e.currentTarget as any).value)
                        }
                        style={{
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                        }}
                      />
                    </th>
                  ))}
                  <th style={{ padding: 8 }}>
                    <button
                      type="button"
                      onClick={addColumn}
                      disabled={disabled}
                    >
                      + Column
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {parsed.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        style={{ border: '1px solid #ddd', padding: 8 }}
                      >
                        <input
                          type="text"
                          disabled={disabled}
                          required={required}
                          value={cell}
                          onChange={(e) =>
                            setCell(r, c, (e.currentTarget as any).value)
                          }
                          style={{ width: '100%', border: 'none' }}
                        />
                      </td>
                    ))}
                    <td style={{ padding: 8 }}>
                      <button
                        type="button"
                        onClick={addRow}
                        disabled={disabled}
                      >
                        + Row
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
    )
  },
)

export default TableInput
