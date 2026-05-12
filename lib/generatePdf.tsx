import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { CVData } from '@/types/cv';

// Capgemini brand colours
const BLUE = '#0070AD';
const LIGHT_BLUE = '#E8F4FD';
const GREY = '#666666';
const DARK = '#1A1A1A';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: DARK,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
  },
  header: {
    backgroundColor: BLUE,
    color: '#ffffff',
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerName: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  headerTitle: { fontSize: 11, color: '#D0E8F7', marginTop: 4 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: BLUE,
    borderBottomWidth: 1,
    borderBottomColor: BLUE,
    paddingBottom: 3,
    marginBottom: 6,
    marginTop: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bodyText: { fontSize: 9, lineHeight: 1.5, marginBottom: 4 },
  tableRow: { flexDirection: 'row', marginBottom: 3 },
  tableCell: { flex: 1, fontSize: 9 },
  tableCellHeader: {
    flex: 1,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: BLUE,
    marginBottom: 4,
  },
  bullet: { fontSize: 9, marginLeft: 10, marginBottom: 2 },
  projectHeader: {
    backgroundColor: LIGHT_BLUE,
    padding: 6,
    marginBottom: 4,
    marginTop: 8,
  },
  projectClient: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: BLUE },
  projectMeta: { fontSize: 8, color: GREY, marginTop: 2 },
  twoCol: { flexDirection: 'row', gap: 8 },
  col: { flex: 1 },
  chip: {
    backgroundColor: LIGHT_BLUE,
    color: BLUE,
    fontSize: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 3,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
});

interface Props {
  cv: CVData;
}

export function CapgeminiCVDocument({ cv }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerName}>{cv.name}</Text>
            <Text style={styles.headerTitle}>{cv.title}</Text>
          </View>
          <Text style={{ color: '#D0E8F7', fontSize: 14, fontFamily: 'Helvetica-Bold' }}>
            Capgemini
          </Text>
        </View>

        {/* Profile Summary */}
        <Text style={styles.sectionTitle}>Profile Summary</Text>
        <Text style={styles.bodyText}>{cv.profileSummary}</Text>

        {/* Key Qualifications */}
        <Text style={styles.sectionTitle}>Key Qualifications</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Roles</Text>
          <Text style={styles.tableCellHeader}>Technology</Text>
          <Text style={styles.tableCellHeader}>Tools</Text>
          <Text style={styles.tableCellHeader}>Methods</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{cv.keyQualifications.roles.join('\n')}</Text>
          <Text style={styles.tableCell}>{cv.keyQualifications.technology.join('\n')}</Text>
          <Text style={styles.tableCell}>{cv.keyQualifications.tools.join('\n')}</Text>
          <Text style={styles.tableCell}>{cv.keyQualifications.methods.join('\n')}</Text>
        </View>

        {/* Employments */}
        {cv.employments.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Employments</Text>
            {cv.employments.map((e, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={{ ...styles.tableCell, color: GREY, flex: 0.4 }}>{e.dateRange}</Text>
                <Text style={{ ...styles.tableCell, fontFamily: 'Helvetica-Bold', flex: 0.8 }}>{e.company}</Text>
                <Text style={styles.tableCell}>{e.title}</Text>
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {cv.education.map((e, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={{ ...styles.tableCell, color: GREY, flex: 0.4 }}>{e.dateRange}</Text>
                <Text style={{ ...styles.tableCell, fontFamily: 'Helvetica-Bold', flex: 0.8 }}>{e.degree}</Text>
                <Text style={styles.tableCell}>{e.institution}</Text>
              </View>
            ))}
          </>
        )}

        {/* Certifications */}
        {cv.certifications.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {cv.certifications.map((c, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={{ ...styles.tableCell, color: GREY, flex: 0.4 }}>{c.date}</Text>
                <Text style={{ ...styles.tableCell, fontFamily: 'Helvetica-Bold', flex: 0.8 }}>{c.name}</Text>
                <Text style={styles.tableCell}>{c.issuer}</Text>
              </View>
            ))}
          </>
        )}

        {/* Courses */}
        {cv.courses.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Courses</Text>
            {cv.courses.map((c, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={{ ...styles.tableCell, color: GREY, flex: 0.4 }}>{c.date}</Text>
                <Text style={{ ...styles.tableCell, fontFamily: 'Helvetica-Bold', flex: 0.8 }}>{c.name}</Text>
                <Text style={styles.tableCell}>{c.provider}</Text>
              </View>
            ))}
          </>
        )}

        {/* Languages */}
        {cv.languages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.chipRow}>
              {cv.languages.map((l, i) => (
                <Text key={i} style={styles.chip}>{l.language} — {l.proficiency}</Text>
              ))}
            </View>
          </>
        )}

        {/* Project Engagements */}
        {cv.projects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Project Engagements</Text>
            {cv.projects.map((p, i) => (
              <View key={i} wrap={false}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectClient}>{p.client} — {p.projectName}</Text>
                  <Text style={styles.projectMeta}>
                    {p.industry} | {p.dateRange} | {p.roles.join(', ')}
                  </Text>
                </View>
                <Text style={styles.bodyText}>{p.description}</Text>
                {p.bulletPoints.map((bp, j) => (
                  <Text key={j} style={styles.bullet}>• {bp}</Text>
                ))}
                {p.methodAndTechnology.length > 0 && (
                  <Text style={{ ...styles.bodyText, color: GREY, marginTop: 3 }}>
                    Methods & Technology: {p.methodAndTechnology.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
