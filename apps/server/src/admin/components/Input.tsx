import React from 'react'
import { useIntl } from 'react-intl'

type InputProps = {
  attribute: {
    type: string
    customField: string
    options?: { showHeader?: boolean; minRows?: number }
  }
  description?: any
  placeholder?: any
  hint?: string
  name: string
  intlLabel: any
  onChange: (args: {
    target: { name: string; type: string; value: unknown }
  }) => void
  contentTypeUID: string
  type: string
  value: unknown
  required?: boolean
  error?: any
  disabled?: boolean
}

const TableInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { attribute, disabled, intlLabel, name, onChange, required, value } =
      props
    const { formatMessage } = useIntl()

    type TableValue = { headers: string[]; rows: string[][] }
    const parsed: TableValue = React.useMemo(() => {
      if (value && typeof value === 'object') return value as TableValue
      return { headers: ['Colonne 1', 'Colonne 2'], rows: [['', '']] }
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
      const headers = [
        ...parsed.headers,
        `Colonne ${parsed.headers.length + 1}`,
      ]
      const rows = parsed.rows.map((row) => [...row, ''])
      update({ ...parsed, headers, rows })
    }

    const addRow = () => {
      const rows = [...parsed.rows, new Array(parsed.headers.length).fill('')]
      update({ ...parsed, rows })
    }

    const removeColumn = (index: number) => {
      if (parsed.headers.length <= 1) return
      const headers = parsed.headers.filter((_, i) => i !== index)
      const rows = parsed.rows.map((row) => row.filter((_, i) => i !== index))
      update({ ...parsed, headers, rows })
    }

    const removeRow = (index: number) => {
      const minRows = attribute.options?.minRows ?? 0
      if (parsed.rows.length <= minRows) return
      const rows = parsed.rows.filter((_, i) => i !== index)
      update({ ...parsed, rows })
    }

    const showHeader = attribute.options?.showHeader ?? true

    const labelText = (() => {
      try {
        if (intlLabel && typeof intlLabel === 'object' && intlLabel.id) {
          return formatMessage(intlLabel)
        }
      } catch {}
      return (
        (intlLabel && (intlLabel.defaultMessage || intlLabel.id)) ||
        name ||
        'Table'
      )
    })()

    return (
      <div>
        <fieldset
          style={{
            border: '1px solid var(--neutral200, #3B3B3B)',
            borderRadius: 8,
            padding: 12,
          }}
        >
          <legend style={{ display: 'block', marginBottom: 8 }}>
            {labelText || 'Tableau'}
          </legend>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                borderCollapse: 'separate',
                borderSpacing: 0,
                width: '100%',
                tableLayout: 'fixed',
              }}
            >
              {showHeader && (
                <thead>
                  <tr>
                    {parsed.headers.map((h, i) => (
                      <th
                        key={i}
                        style={{
                          border: '1px solid var(--neutral300,#5A5A5A)',
                          padding: 8,
                          background: 'var(--neutral100,#232323)',
                          position: 'relative',
                        }}
                      >
                        <input
                          ref={i === 0 ? (ref as any) : undefined}
                          type="text"
                          disabled={disabled}
                          required={required}
                          value={h}
                          onChange={(e) => setHeader(i, e.currentTarget.value)}
                          style={{
                            width: '100%',
                            border: 'none',
                            background: 'transparent',
                            fontWeight: 600,
                            color: 'var(--neutral0,#FFFFFF)',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeColumn(i)}
                          disabled={disabled}
                          title="Supprimer la colonne"
                          style={{
                            position: 'absolute',
                            top: 6,
                            right: 6,
                            background: 'transparent',
                            border: '1px solid var(--neutral300,#5A5A5A)',
                            borderRadius: 4,
                            color: '#BBB',
                            cursor: 'pointer',
                            width: 24,
                            height: 24,
                            lineHeight: '20px',
                          }}
                        >
                          ×
                        </button>
                      </th>
                    ))}
                    <th style={{ padding: 8, whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        onClick={addColumn}
                        disabled={disabled}
                        style={{
                          padding: '4px 10px',
                          border: '1px solid var(--neutral300,#5A5A5A)',
                          background: 'var(--neutral100,#232323)',
                          color: 'var(--neutral0,#FFFFFF)',
                          borderRadius: 4,
                        }}
                      >
                        + Colonne
                      </button>
                    </th>
                  </tr>
                </thead>
              )}
              <tbody>
                {parsed.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        style={{
                          border: '1px solid var(--neutral300,#5A5A5A)',
                          padding: 8,
                          background: 'var(--neutral110,#1D1D1D)',
                        }}
                      >
                        <input
                          type="text"
                          disabled={disabled}
                          required={required}
                          value={cell}
                          onChange={(e) => setCell(r, c, e.currentTarget.value)}
                          style={{
                            width: '100%',
                            background: 'var(--neutral100,#232323)',
                            border: '1px solid var(--neutral200,#3B3B3B)',
                            borderRadius: 4,
                            padding: '6px 8px',
                            color: 'var(--neutral0,#FFFFFF)',
                          }}
                        />
                      </td>
                    ))}
                    <td
                      style={{
                        padding: 8,
                        whiteSpace: 'nowrap',
                        verticalAlign: 'top',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          type="button"
                          onClick={addRow}
                          disabled={disabled}
                          style={{
                            padding: '4px 10px',
                            border: '1px solid var(--neutral300,#5A5A5A)',
                            background: 'var(--neutral100,#232323)',
                            color: 'var(--neutral0,#FFFFFF)',
                            borderRadius: 4,
                          }}
                        >
                          + Ligne
                        </button>
                        <button
                          type="button"
                          onClick={() => removeRow(r)}
                          disabled={
                            disabled ||
                            (attribute.options?.minRows ?? 0) >=
                              parsed.rows.length
                          }
                          style={{
                            padding: '4px 10px',
                            border: '1px solid var(--neutral300,#5A5A5A)',
                            background: 'var(--neutral100,#232323)',
                            color: 'var(--neutral0,#FFFFFF)',
                            borderRadius: 4,
                          }}
                        >
                          Supprimer
                        </button>
                      </div>
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
