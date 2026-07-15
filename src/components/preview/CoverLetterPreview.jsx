import useCoverLetterStore from '../../store/useCoverLetterStore'

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
          {letterDate && <div className="text-right mb-4">{letterDate}</div>}

          {/* Hal / Perihal (Left Aligned) */}
          {letterSubject && (
            <div className="mb-4 flex gap-2">
              <span className="font-bold shrink-0">Hal:</span>
              <span>{letterSubject}</span>
            </div>
          )}

          {/* Recipient Details */}
          {(recipientName || recipientAddress) && (
            <div className="mb-4 leading-normal">
              {recipientName && <div className={boldRecipientName !== false ? 'font-semibold' : ''}>{renderNewLines(recipientName)}</div>}
              {recipientAddress && <div>{renderNewLines(recipientAddress)}</div>}
            </div>
          )}

          {/* Salutation */}
          {salutation && <div className="mb-3">{salutation}</div>}

          {/* Body Paragraph 1 (Opening) */}
          {bodyParagraph1 && <p className="text-justify mb-3">{bodyParagraph1}</p>}

          {/* Body Paragraph 2 (Intro to Biodata) */}
          {bodyParagraph2 && <p className="text-justify mb-2">{bodyParagraph2}</p>}

          {/* Biodata Block (Colons aligned) */}
          {hasBiodata && (
            <div className="grid grid-cols-[160px_10px_1fr] gap-x-1 gap-y-0.5 mb-3 pl-4 leading-normal">
              {senderName && (
                <>
                  <div className="text-slate-700">Nama</div>
                  <div className="text-slate-700">:</div>
                  <div className={`text-slate-900 ${boldSenderName !== false ? 'font-bold' : ''}`}>{senderName}</div>
                </>
              )}

              {birthPlaceDate && (
                <>
                  <div className="text-slate-700">Tempat, Tanggal Lahir</div>
                  <div className="text-slate-700">:</div>
                  <div className="text-slate-900">{birthPlaceDate}</div>
                </>
              )}

              {gender && (
                <>
                  <div className="text-slate-700">Jenis Kelamin</div>
                  <div className="text-slate-700">:</div>
                  <div className="text-slate-900">{gender}</div>
                </>
              )}

              {senderAddress && (
                <>
                  <div className="text-slate-700">Alamat</div>
                  <div className="text-slate-700">:</div>
                  <div className="text-slate-900">{senderAddress}</div>
                </>
              )}

              {lastEducation && (
                <>
                  <div className="text-slate-700">Pendidikan Terakhir</div>
                  <div className="text-slate-700">:</div>
                  <div className="text-slate-900">{lastEducation}</div>
                </>
              )}

              {senderPhone && (
                <>
                  <div className="text-slate-700">Nomor Handphone</div>
                  <div className="text-slate-700">:</div>
                  <div className="text-slate-900">{senderPhone}</div>
                </>
              )}

              {senderEmail && (
                <>
                  <div className="text-slate-700">Email</div>
                  <div className="text-slate-700">:</div>
                  <div className="text-slate-900">{senderEmail}</div>
                </>
              )}
            </div>
          )}

          {/* Transition text before Attachments */}
          {attachmentList.length > 0 && (
            <>
              <p className="mb-2 text-justify">
                Untuk melengkapi beberapa data yang diperlukan sebagai persyaratan administrasi dan juga sebagai bahan pertimbangan Bapak/Ibu, saya lampirkan juga kelengkapan data diri sebagai berikut :
              </p>

              {/* Attachments List */}
              <ol className="list-decimal pl-6 mb-3 space-y-0.5">
                {attachmentList.map((item, idx) => (
                  <li key={idx} className="text-slate-800">
                    {item}
                  </li>
                ))}
              </ol>
            </>
          )}

          {/* Body Paragraph 3 (Closing sentence) */}
          {bodyParagraph3 && <p className="text-justify mb-4">{bodyParagraph3}</p>}

          {/* Closing & Signature (Bottom Right Aligned) */}
          <div className="mt-4 ml-auto text-left w-[150px]">
            {closingSalutation && <p className="mb-1">{closingSalutation}</p>}
            
            {showSignature && signatureImage ? (
              <div className="my-1.5 h-[50px] flex items-center justify-start">
                <img
                  src={signatureImage}
                  alt="Signature"
                  className="max-h-[45px] max-w-[140px] object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            ) : (
              <div className="h-[50px]" />
            )}

            {senderName && <p className={`${boldSenderName !== false ? 'font-bold' : ''} ${underlineSenderName ? 'underline' : ''}`}>({senderName})</p>}
          </div>
        </div>
      ) : (
        // ================= TEMPLATE MODERN/BLOCK STYLE =================
        <div className="flex flex-col h-full">
          {/* Header / Sender Info (Aligned Top Right) */}
          <div className="text-right mb-6">
            {senderName && <h1 className="text-sm font-bold text-slate-900 mb-0.5">{senderName}</h1>}
            {senderAddress && <p className="text-slate-700 text-xs leading-relaxed">{senderAddress}</p>}
            {senderPhone && <p className="text-slate-700 text-xs leading-relaxed">{senderPhone}</p>}
            {senderEmail && <p className="text-slate-700 text-xs leading-relaxed">{senderEmail}</p>}
          </div>

          {/* Date (Left Aligned) */}
          {letterDate && <div className="mb-4">{letterDate}</div>}

          {/* Subject & Enclosure (Left Aligned) */}
          <div className="mb-4">
            {letterSubject && (
              <div className="flex gap-2">
                <span className="w-20 font-bold shrink-0">Perihal:</span>
                <span className="font-bold">{letterSubject}</span>
              </div>
            )}
            {letterEnclosure && (
              <div className="flex gap-2">
                <span className="w-20 shrink-0">Lampiran:</span>
                <span>{letterEnclosure}</span>
              </div>
            )}
          </div>

          {/* Recipient Details */}
          {(recipientName || recipientAddress) && (
            <div className="mb-4 leading-normal">
              {recipientName && <div className={boldRecipientName !== false ? 'font-semibold' : ''}>{renderNewLines(recipientName)}</div>}
              {recipientAddress && <div>{renderNewLines(recipientAddress)}</div>}
            </div>
          )}

          {/* Salutation */}
          {salutation && <div className="mb-3">{salutation}</div>}

          {/* Body Paragraphs */}
          <div className="space-y-3 mb-6 text-justify">
            {bodyParagraph1 && <p>{bodyParagraph1}</p>}
            {bodyParagraph2 && <p>{bodyParagraph2}</p>}
            {bodyParagraph3 && <p>{bodyParagraph3}</p>}
          </div>

          {/* Closing & Signature */}
          <div className="mt-4 pt-2">
            {closingSalutation && <p className="mb-1">{closingSalutation}</p>}
            
            {showSignature && signatureImage ? (
              <div className="my-1.5 h-[50px] flex items-center justify-start">
                <img
                  src={signatureImage}
                  alt="Signature"
                  className="max-h-[45px] max-w-[140px] object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            ) : (
              <div className="h-[50px]" />
            )}

            {senderName && <p className={`${boldSenderName !== false ? 'font-bold' : ''} ${underlineSenderName ? 'underline' : ''}`}>{senderName}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
