import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: '15mm 20mm',
    fontSize: 11,
    fontFamily: 'Times-Roman',
    color: '#1e293b',
    lineHeight: 1.3,
  },
  // Sender info aligned top right (for Modern template)
  senderContainer: {
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  senderName: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    color: '#0f172a',
    marginBottom: 2,
  },
  senderDetail: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.3,
  },
  // Date
  dateContainerLeft: {
    marginBottom: 10,
  },
  dateContainerRight: {
    alignItems: 'flex-start',
    marginLeft: 'auto',
    width: 135,
    marginBottom: 10,
  },
  // Subject & Enclosure row
  metaContainer: {
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  metaLabel: {
    width: 60,
  },
  metaLabelBold: {
    width: 60,
    fontFamily: 'Times-Bold',
  },
  metaValueBold: {
    fontFamily: 'Times-Bold',
    flex: 1,
  },
  metaValue: {
    flex: 1,
  },
  // Recipient info
  recipientContainer: {
    marginBottom: 10,
  },
  recipientNameContainer: {
    marginBottom: 2,
  },
  recipientNameText: {
    fontFamily: 'Times-Bold',
  },
  // Salutation
  salutation: {
    marginBottom: 8,
  },
  // Body Paragraphs (justify alignment)
  bodyParagraph: {
    textAlign: 'justify',
    marginBottom: 8,
  },
  // Biodata Table (align rows neatly)
  biodataRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 12,
  },
  biodataLabel: {
    width: 140,
    color: '#334155',
  },
  biodataSeparator: {
    width: 10,
    color: '#334155',
  },
  biodataValue: {
    flex: 1,
    color: '#0f172a',
  },
  biodataValueBold: {
    flex: 1,
    color: '#0f172a',
    fontFamily: 'Times-Bold',
  },
  // Attachments
  attachmentRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 16,
  },
  attachmentNumber: {
    width: 16,
    color: '#334155',
  },
  attachmentText: {
    flex: 1,
    color: '#334155',
  },
  // Closing and Signature (Modern Left-aligned)
  closingContainerLeft: {
    marginTop: 14,
  },
  // Closing and Signature (Biodata Right-aligned)
  closingContainerRight: {
    marginTop: 14,
    marginLeft: 'auto',
    width: 140,
  },
  closingSalutation: {
    marginBottom: 4,
  },
  signatureImage: {
    width: 110,
    height: 45,
    objectFit: 'contain',
    marginVertical: 4,
  },
  signaturePlaceholder: {
    height: 45,
  },
  senderNameSignatureBase: {
    marginTop: 4,
  },
  senderNameUnderline: {
    textDecoration: 'underline',
  },
  senderNameBold: {
    fontFamily: 'Times-Bold',
  },
  senderNameRegular: {
    fontFamily: 'Times-Roman',
  },
})

export default function CoverLetterPDFDocument({ data }) {
  const {
    template = 'modern',
    senderName = '',
    senderAddress = '',
    senderPhone = '',
    senderEmail = '',
    letterDate = '',
    letterSubject = '',
    letterEnclosure = '',
    recipientName = '',
    recipientAddress = '',
    salutation = '',
    bodyParagraph1 = '',
    bodyParagraph2 = '',
    bodyParagraph3 = '',
    closingSalutation = '',
    signatureImage = '',
    showSignature = true,
    boldSenderName = true,
    underlineSenderName = false,
    boldRecipientName = true,
    // Biodata fields
    birthPlaceDate = '',
    gender = '',
    lastEducation = '',
    attachments = '',
  } = data

  const renderLines = (text, textStyle = null) => {
    if (!text) return null
    return text.split('\n').map((line, idx) => (
      <Text key={idx} style={textStyle}>{line}</Text>
    ))
  }

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
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Template: Biodata Style */}
        {template === 'biodata' ? (
          <View>
            {/* Date (Top Right) */}
            {letterDate ? (
              <View style={styles.dateContainerRight}>
                <Text>{letterDate}</Text>
              </View>
            ) : null}

            {/* Hal */}
            {letterSubject ? (
              <View style={styles.metaContainer}>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabelBold}>Hal:</Text>
                  <Text style={styles.metaValue}>{letterSubject}</Text>
                </View>
              </View>
            ) : null}

            {/* Recipient Details */}
            {(recipientName || recipientAddress) ? (
              <View style={styles.recipientContainer}>
                {recipientName ? (
                  <View style={styles.recipientNameContainer}>
                    {renderLines(recipientName, boldRecipientName ? styles.recipientNameText : null)}
                  </View>
                ) : null}
                {recipientAddress ? <View>{renderLines(recipientAddress)}</View> : null}
              </View>
            ) : null}

            {/* Salutation */}
            {salutation ? (
              <View style={styles.salutation}>
                <Text>{salutation}</Text>
              </View>
            ) : null}

            {/* Paragraph 1 */}
            {bodyParagraph1 ? <Text style={styles.bodyParagraph}>{bodyParagraph1}</Text> : null}

            {/* Paragraph 2 (Intro to Biodata) */}
            {bodyParagraph2 ? <Text style={styles.bodyParagraph}>{bodyParagraph2}</Text> : null}

            {/* Biodata list */}
            {hasBiodata ? (
              <View style={{ marginBottom: 10 }}>
                {senderName ? (
                  <View style={styles.biodataRow}>
                    <Text style={styles.biodataLabel}>Nama</Text>
                    <Text style={styles.biodataSeparator}>:</Text>
                    <Text style={boldSenderName ? styles.biodataValueBold : styles.biodataValue}>{senderName}</Text>
                  </View>
                ) : null}
                {birthPlaceDate ? (
                  <View style={styles.biodataRow}>
                    <Text style={styles.biodataLabel}>Tempat, Tanggal Lahir</Text>
                    <Text style={styles.biodataSeparator}>:</Text>
                    <Text style={styles.biodataValue}>{birthPlaceDate}</Text>
                  </View>
                ) : null}
                {gender ? (
                  <View style={styles.biodataRow}>
                    <Text style={styles.biodataLabel}>Jenis Kelamin</Text>
                    <Text style={styles.biodataSeparator}>:</Text>
                    <Text style={styles.biodataValue}>{gender}</Text>
                  </View>
                ) : null}
                {senderAddress ? (
                  <View style={styles.biodataRow}>
                    <Text style={styles.biodataLabel}>Alamat</Text>
                    <Text style={styles.biodataSeparator}>:</Text>
                    <Text style={styles.biodataValue}>{senderAddress}</Text>
                  </View>
                ) : null}
                {lastEducation ? (
                  <View style={styles.biodataRow}>
                    <Text style={styles.biodataLabel}>Pendidikan Terakhir</Text>
                    <Text style={styles.biodataSeparator}>:</Text>
                    <Text style={styles.biodataValue}>{lastEducation}</Text>
                  </View>
                ) : null}
                {senderPhone ? (
                  <View style={styles.biodataRow}>
                    <Text style={styles.biodataLabel}>Nomor Handphone</Text>
                    <Text style={styles.biodataSeparator}>:</Text>
                    <Text style={styles.biodataValue}>{senderPhone}</Text>
                  </View>
                ) : null}
                {senderEmail ? (
                  <View style={styles.biodataRow}>
                    <Text style={styles.biodataLabel}>Email</Text>
                    <Text style={styles.biodataSeparator}>:</Text>
                    <Text style={styles.biodataValue}>{senderEmail}</Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Transition sentence before attachments & attachments list */}
            {attachmentList.length > 0 ? (
              <View>
                <Text style={styles.bodyParagraph}>
                  Untuk melengkapi beberapa data yang diperlukan sebagai persyaratan administrasi dan juga sebagai bahan pertimbangan Bapak/Ibu, saya lampirkan juga kelengkapan data diri sebagai berikut :
                </Text>

                <View style={{ marginBottom: 10 }}>
                  {attachmentList.map((item, idx) => (
                    <View key={idx} style={styles.attachmentRow}>
                      <Text style={styles.attachmentNumber}>{idx + 1}.</Text>
                      <Text style={styles.attachmentText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}

            {/* Paragraph 3 (Closing) */}
            {bodyParagraph3 ? <Text style={styles.bodyParagraph}>{bodyParagraph3}</Text> : null}

            {/* Closing & Signature (Right aligned for Biodata template) */}
            <View style={styles.closingContainerRight}>
              {closingSalutation ? <Text style={styles.closingSalutation}>{closingSalutation}</Text> : null}

              {showSignature && signatureImage ? (
                <Image src={signatureImage} style={styles.signatureImage} />
              ) : (
                <View style={styles.signaturePlaceholder} />
              )}

              {senderName ? (
                <Text style={[
                  styles.senderNameSignatureBase,
                  boldSenderName ? styles.senderNameBold : styles.senderNameRegular,
                  underlineSenderName ? styles.senderNameUnderline : null
                ]}>
                  ({senderName})
                </Text>
              ) : null}
            </View>
          </View>
        ) : (
          
          /* Template: Modern Style */
          <View>
            {/* Sender Info (Top Right) */}
            <View style={styles.senderContainer}>
              {senderName ? <Text style={styles.senderName}>{senderName}</Text> : null}
              {senderAddress ? <Text style={styles.senderDetail}>{senderAddress}</Text> : null}
              {senderPhone ? <Text style={styles.senderDetail}>{senderPhone}</Text> : null}
              {senderEmail ? <Text style={styles.senderDetail}>{senderEmail}</Text> : null}
            </View>

            {/* Letter Date */}
            {letterDate ? (
              <View style={styles.dateContainerLeft}>
                <Text>{letterDate}</Text>
              </View>
            ) : null}

            {/* Subject & Enclosure */}
            <View style={styles.metaContainer}>
              {letterSubject ? (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabelBold}>Perihal:</Text>
                  <Text style={styles.metaValueBold}>{letterSubject}</Text>
                </View>
              ) : null}
              {letterEnclosure ? (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Lampiran:</Text>
                  <Text style={styles.metaValue}>{letterEnclosure}</Text>
                </View>
              ) : null}
            </View>

            {/* Recipient Details */}
            {(recipientName || recipientAddress) ? (
              <View style={styles.recipientContainer}>
                {recipientName ? (
                  <View style={styles.recipientNameContainer}>
                    {renderLines(recipientName, boldRecipientName ? styles.recipientNameText : null)}
                  </View>
                ) : null}
                {recipientAddress ? <View>{renderLines(recipientAddress)}</View> : null}
              </View>
            ) : null}

            {/* Salutation */}
            {salutation ? (
              <View style={styles.salutation}>
                <Text>{salutation}</Text>
              </View>
            ) : null}

            {/* Body Paragraphs */}
            {bodyParagraph1 ? <Text style={styles.bodyParagraph}>{bodyParagraph1}</Text> : null}
            {bodyParagraph2 ? <Text style={styles.bodyParagraph}>{bodyParagraph2}</Text> : null}
            {bodyParagraph3 ? <Text style={styles.bodyParagraph}>{bodyParagraph3}</Text> : null}

            {/* Closing & Signature (Left aligned for Modern template) */}
            <View style={styles.closingContainerLeft}>
              {closingSalutation ? <Text style={styles.closingSalutation}>{closingSalutation}</Text> : null}

              {showSignature && signatureImage ? (
                <Image src={signatureImage} style={styles.signatureImage} />
              ) : (
                <View style={styles.signaturePlaceholder} />
              )}

              {senderName ? (
                <Text style={[
                  styles.senderNameSignatureBase,
                  boldSenderName ? styles.senderNameBold : styles.senderNameRegular,
                  underlineSenderName ? styles.senderNameUnderline : null
                ]}>
                  {senderName}
                </Text>
              ) : null}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}
