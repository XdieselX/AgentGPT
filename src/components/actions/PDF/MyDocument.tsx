import React from "react";
import ReactPDF, {
  Document,
  Page,
  Text,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
import View = ReactPDF.View;
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
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  section: {
    fontSize: 12,
    fontFamily: "Roboto",
    marginVertical: 10,
    lineHeight: 1.5,
  },
});

const MyDocument: React.FC<MyDocumentProps> = (props: MyDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {props.textSections.map((text) => (
        <>
          <Text style={styles.section}>{text}</Text>
          <HorizontalRule />
        </>
      ))}
    </Page>
  </Document>
);

const HorizontalRule: React.FC = () => <View style={styles.horizontalRule} />;

export default MyDocument;
