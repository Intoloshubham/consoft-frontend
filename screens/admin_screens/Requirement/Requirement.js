import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ReportPdf from '../Reports/ReportPdf';

const Requirement = () => {
  const [name, setname] = React.useState('saurabh soni');

  // const str = name => `<html>
  // <head>
  // </head>
  // <body>

  // <h1>${name}</h1>
  // <p>This is a paragraph.</p>
  // <p>This is a paragraph1.</p>
  // <p>This is a paragraph2.</p>
  // <p>This is a paragraph3.</p>

  // </body>
  // </html>`;

  const createPDF = async () => {
    let options = {
      html: ReportPdf(name),
      fileName: 'daliy report',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);
    // console.log('object');
  };

  return (
    <View>
      <TouchableOpacity onPress={createPDF}>
        <Text>Create PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Requirement;
