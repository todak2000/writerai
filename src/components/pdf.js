import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer/lib/react-pdf.browser.cjs";
  import { createRef } from "react";
  import Pdf from "react-to-pdf";
  import HTMLtoDOCX from 'html-to-docx';
  import { saveAs } from 'file-saver';

  const ref = createRef();
//   '@react-pdf/renderer/lib/react-pdf.browser.es.js';
  // Create styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "red",
      color: "white",
    },
    section: {
      margin: "2%",
      padding: "2%",
      backgroundColor:"#fff",
      width: '95%', //the pdf viewer will take up all of the width and height
    //   height: '90vh',
    },
    viewer: {
      width: '90%', //the pdf viewer will take up all of the width and height
    //   height: '90vh',
      backgroundColor:"#fff"
    },
    text:{
        color:'#ff0',
        size:40,
    }
  });
  
  // Create Document Component
function BasicDocument(props) {
    // console.log(props)
    const includesArr = ["Education", "Summary", "Skills", "Objective", "Experience"]
    let arr = props.text.split("\n")
    async function downloadDocx(params) {
        const fileBuffer = await HTMLtoDOCX(htmlString, null, {
          table: { row: { cantSplit: true } },
          footer: true,
          pageNumber: true,
        });
    
        saveAs(fileBuffer, `${arr[0]}.docx`);
    }
    let htmlString = arr.map((item, index) => `<p className="text-3xl mb-2 font-bold">${item}</p>`).join(" ");
    return (
        <div style={styles.viewer}>
            {/* <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf2</button>}
          </Pdf> */}

            <button
              onClick={downloadDocx}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Download as Word Doc
            </button>

            {/* <div style={styles.section} ref={ref}>
            {arr.map((item, index)=>{
               
                return(
                    <div className="" >
                        {item === ""&& <br></br> }
                        {item !== "" && index == 0 &&
                        <p className="text-3xl mb-2 font-bold">{item}</p>
                        }
                    
                        {item !== "" && index !== 0 &&
                        <p className="text-lg">{item}</p>
                        }
                        
                    </div>
                )
            })}
            </div> */}
        </div>
    );
}
  export default BasicDocument;