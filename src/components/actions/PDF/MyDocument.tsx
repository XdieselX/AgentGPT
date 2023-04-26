import React from "react";
import { Document, Page, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { MyDocumentProps } from "./index.props";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  section: {
    fontSize: 12,
    fontFamily: "Roboto",
    marginBottom: 20,
    lineHeight: 1.5,
  },
});

const MyDocument: React.FC<MyDocumentProps> = (props: MyDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.section}>{props.content}</Text>
    </Page>
  </Document>
);

export default MyDocument;
