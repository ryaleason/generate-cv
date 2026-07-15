import useCoverLetterStore from '../../store/useCoverLetterStore'

// Keep these values in PDF points. They intentionally mirror
// CoverLetterPDFDocument's StyleSheet so the browser preview has the same
// line breaks, spacing, and column positions as the exported document.
const pdfLayout = {
  senderContainer: { textAlign: 'right', marginBottom: '14pt' },
  senderName: { fontSize: '11pt', fontWeight: 700, color: '#0f172a', marginBottom: '2pt' },
  senderDetail: { fontSize: '9pt', color: '#334155', lineHeight: 1.3 },
  date: { marginBottom: '10pt' },
  meta: { marginBottom: '10pt' },
  metaRow: { display: 'flex', marginBottom: '2pt' },
  metaLabel: { width: '60pt', flexShrink: 0 },
  recipient: { marginBottom: '10pt' },
  recipientName: { marginBottom: '2pt' },
  salutation: { marginBottom: '8pt' },
  paragraph: { textAlign: 'justify', marginBottom: '8pt' },
  biodata: { marginBottom: '10pt' },
  biodataRow: { display: 'grid', gridTemplateColumns: '140pt 10pt minmax(0, 1fr)', paddingLeft: '12pt', marginBottom: '2pt' },
  attachmentList: { marginBottom: '10pt' },
  attachmentRow: { display: 'flex', paddingLeft: '16pt', marginBottom: '2pt' },
  attachmentNumber: { width: '16pt', flexShrink: 0 },
  closingLeft: { marginTop: '14pt' },
  closingRight: { marginTop: '14pt', marginLeft: 'auto', width: '135pt' },
  closingSalutation: { marginBottom: '4pt', marginTop: '5pt' },
  signature: { width: '63pt', height: '60pt', objectFit: 'contain', margin: '3pt 0' },
  signaturePlaceholder: { height: '45pt' },
  signatureName: { marginTop: '4pt' },
}

export default function CoverLetterPreview() {
  const { coverLetterInfo } = useCoverLetterStore()
  const {
    template = 'modern',
    senderName,
    senderAddress,
    senderPhone,
    senderEmail,
    letterDate,
    letterSubject,
    letterEnclosure,
    recipientName,
    recipientAddress,
    salutation,
    bodyParagraph1,
    bodyParagraph2,
    bodyParagraph3,
    closingSalutation,
    signatureImage,
    showSignature,
    boldSenderName,
    underlineSenderName,
    boldRecipientName,
    // Biodata Template Fields
    birthPlaceDate,
    gender,
    lastEducation,
    attachments,
  } = coverLetterInfo

  // Helper to split text by newline for rendering address/recipient info correctly
  const renderNewLines = (text) => {
    if (!text) return null
    return text.split('\n').map((line, i) => (
      <span key={i} className="block">
        {line}
      </span>
    ))
  }

  const hasContent =
    senderName ||
    senderAddress ||
    senderPhone ||
    senderEmail ||
    letterDate ||
    letterSubject ||
    letterEnclosure ||
    recipientName ||
    recipientAddress ||
    bodyParagraph1 ||
    bodyParagraph2 ||
    bodyParagraph3

  const attachmentList = attachments ? attachments.split('\n').filter(line => line.trim()) : []
  const hasBiodata = !!(
    senderName ||
    birthPlaceDate ||
    gender ||
    senderAddress ||
    lastEducation ||
    senderPhone ||
    senderEmail
  )

  return (
    <div
      className="cover-letter-preview bg-white shadow-lg border border-slate-200 mx-auto"
      style={{
        width: '210mm',
        minHeight: '297mm',
        maxWidth: '100%',
        padding: '15mm 20mm',
        fontFamily: '"Times New Roman", Times, Georgia, serif',
        color: '#1e293b',
        lineHeight: '1.3',
        fontSize: '11pt',
      }}
    >
      {!hasContent ? (
        <div className="flex items-center justify-center h-64 text-slate-300">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 mx-auto mb-4 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">
              Mulai isi form di sebelah kiri untuk melihat preview Surat Lamaran
            </p>
          </div>
        </div>
      ) : template === 'biodata' ? (
        // ================= TEMPLATE KLASIK BIODATA =================
        <div className="flex flex-col h-full">
          {/* Date (Aligned Top Right) */}
          {letterDate && <div style={{ ...pdfLayout.date, marginLeft: 'auto', width: '105pt' }}>{letterDate}</div>}

          {/* Hal / Perihal (Left Aligned) */}
          {letterSubject && (
            <div style={pdfLayout.meta}>
              <div style={pdfLayout.metaRow}>
              <span style={{ ...pdfLayout.metaLabel, fontWeight: 700 }}>Hal:</span>
              <span>{letterSubject}</span>
              </div>
            </div>
          )}

          {/* Recipient Details */}
          {(recipientName || recipientAddress) && (
            <div style={pdfLayout.recipient}>
              {recipientName && <div style={{ ...pdfLayout.recipientName, fontWeight: boldRecipientName !== false ? 700 : 400 }}>{renderNewLines(recipientName)}</div>}
              {recipientAddress && <div>{renderNewLines(recipientAddress)}</div>}
            </div>
          )}

          {/* Salutation */}
          {salutation && <div style={pdfLayout.salutation}>{salutation}</div>}

          {/* Body Paragraph 1 (Opening) */}
          {bodyParagraph1 && <p style={pdfLayout.paragraph}>{bodyParagraph1}</p>}

          {/* Body Paragraph 2 (Intro to Biodata) */}
          {bodyParagraph2 && <p style={pdfLayout.paragraph}>{bodyParagraph2}</p>}

          {/* Biodata Block (Colons aligned) */}
          {hasBiodata && (
            <div style={pdfLayout.biodata}>
              {senderName && (
                <div style={pdfLayout.biodataRow}>
                  <div style={{ color: '#334155' }}>Nama</div><div style={{ color: '#334155' }}>:</div><div style={{ color: '#0f172a', fontWeight: boldSenderName !== false ? 700 : 400 }}>{senderName}</div>
                </div>
              )}

              {birthPlaceDate && (
                <div style={pdfLayout.biodataRow}>
                  <div style={{ color: '#334155' }}>Tempat, Tanggal Lahir</div><div style={{ color: '#334155' }}>:</div><div style={{ color: '#0f172a' }}>{birthPlaceDate}</div>
                </div>
              )}

              {gender && (
                <div style={pdfLayout.biodataRow}>
                  <div style={{ color: '#334155' }}>Jenis Kelamin</div><div style={{ color: '#334155' }}>:</div><div style={{ color: '#0f172a' }}>{gender}</div>
                </div>
              )}

              {senderAddress && (
                <div style={pdfLayout.biodataRow}>
                  <div style={{ color: '#334155' }}>Alamat</div><div style={{ color: '#334155' }}>:</div><div style={{ color: '#0f172a' }}>{senderAddress}</div>
                </div>
              )}

              {lastEducation && (
                <div style={pdfLayout.biodataRow}>
                  <div style={{ color: '#334155' }}>Pendidikan Terakhir</div><div style={{ color: '#334155' }}>:</div><div style={{ color: '#0f172a' }}>{lastEducation}</div>
                </div>
              )}

              {senderPhone && (
                <div style={pdfLayout.biodataRow}>
                  <div style={{ color: '#334155' }}>Nomor Handphone</div><div style={{ color: '#334155' }}>:</div><div style={{ color: '#0f172a' }}>{senderPhone}</div>
                </div>
              )}

              {senderEmail && (
                <div style={pdfLayout.biodataRow}>
                  <div style={{ color: '#334155' }}>Email</div><div style={{ color: '#334155' }}>:</div><div style={{ color: '#0f172a' }}>{senderEmail}</div>
                </div>
              )}
            </div>
          )}

          {/* Transition text before Attachments */}
          {attachmentList.length > 0 && (
            <>
              <p style={pdfLayout.paragraph}>
                Untuk melengkapi beberapa data yang diperlukan sebagai persyaratan administrasi dan juga sebagai bahan pertimbangan Bapak/Ibu, saya lampirkan juga kelengkapan data diri sebagai berikut :
              </p>

              {/* Attachments List */}
              <div style={pdfLayout.attachmentList}>
                {attachmentList.map((item, idx) => (
                  <div key={idx} style={pdfLayout.attachmentRow}>
                    <span style={{ ...pdfLayout.attachmentNumber, color: '#334155' }}>{idx + 1}.</span><span style={{ color: '#334155' }}>{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Body Paragraph 3 (Closing sentence) */}
          {bodyParagraph3 && <p style={pdfLayout.paragraph}>{bodyParagraph3}</p>}

          {/* Closing & Signature (Bottom Right Aligned) */}
          <div style={{ ...pdfLayout.closingRight, width: '110pt' }}>
            {closingSalutation && <p style={pdfLayout.closingSalutation}>{closingSalutation}</p>}
            
            {showSignature && signatureImage ? (
              <div style={{ ...pdfLayout.signature, display: 'flex', alignItems: 'center' }}>
                <img
                  src={signatureImage}
                  alt="Signature"
                  style={pdfLayout.signature}
                />
              </div>
            ) : (
              <div style={pdfLayout.signaturePlaceholder} />
            )}

            {senderName && <p style={{ ...pdfLayout.signatureName, fontWeight: boldSenderName !== false ? 700 : 400, textDecoration: underlineSenderName ? 'underline' : 'none' }}>({senderName})</p>}
          </div>
        </div>
      ) : (
        // ================= TEMPLATE MODERN/BLOCK STYLE =================
        <div className="flex flex-col h-full">
          {/* Header / Sender Info (Aligned Top Right) */}
          <div style={pdfLayout.senderContainer}>
            {senderName && <h1 style={pdfLayout.senderName}>{senderName}</h1>}
            {senderAddress && <p style={pdfLayout.senderDetail}>{senderAddress}</p>}
            {senderPhone && <p style={pdfLayout.senderDetail}>{senderPhone}</p>}
            {senderEmail && <p style={pdfLayout.senderDetail}>{senderEmail}</p>}
          </div>

          {/* Date (Left Aligned) */}
          {letterDate && <div style={pdfLayout.date}>{letterDate}</div>}

          {/* Subject & Enclosure (Left Aligned) */}
          <div style={pdfLayout.meta}>
            {letterSubject && (
              <div style={pdfLayout.metaRow}>
                <span style={{ ...pdfLayout.metaLabel, fontWeight: 700 }}>Perihal:</span>
                <span style={{ fontWeight: 700 }}>{letterSubject}</span>
              </div>
            )}
            {letterEnclosure && (
              <div style={pdfLayout.metaRow}>
                <span style={pdfLayout.metaLabel}>Lampiran:</span>
                <span>{letterEnclosure}</span>
              </div>
            )}
          </div>

          {/* Recipient Details */}
          {(recipientName || recipientAddress) && (
            <div style={pdfLayout.recipient}>
              {recipientName && <div style={{ ...pdfLayout.recipientName, fontWeight: boldRecipientName !== false ? 700 : 400 }}>{renderNewLines(recipientName)}</div>}
              {recipientAddress && <div>{renderNewLines(recipientAddress)}</div>}
            </div>
          )}

          {/* Salutation */}
          {salutation && <div style={pdfLayout.salutation}>{salutation}</div>}

          {/* Body Paragraphs */}
          {bodyParagraph1 && <p style={pdfLayout.paragraph}>{bodyParagraph1}</p>}
          {bodyParagraph2 && <p style={pdfLayout.paragraph}>{bodyParagraph2}</p>}
          {bodyParagraph3 && <p style={pdfLayout.paragraph}>{bodyParagraph3}</p>}

          {/* Closing & Signature */}
          <div style={pdfLayout.closingLeft}>
            {closingSalutation && <p style={pdfLayout.closingSalutation}>{closingSalutation}</p>}
            
            {showSignature && signatureImage ? (
              <div style={{ ...pdfLayout.signature, display: 'flex', alignItems: 'center' }}>
                <img 
                  src={signatureImage}
                  alt="Signature"
                  style={pdfLayout.signature}
                />
              </div>
            ) : (
              <div style={pdfLayout.signaturePlaceholder} />
            )}

            {senderName && <p style={{ ...pdfLayout.signatureName, fontWeight: boldSenderName !== false ? 700 : 400, textDecoration: underlineSenderName ? 'underline' : 'none' }}>{senderName}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
