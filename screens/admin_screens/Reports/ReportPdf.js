const ReportPdf = (reportData, manpower, quantity) =>
  `<html>
  <body>
    <header>
        <h2 style="text-align:center; text-decoration: underline;">Daily Progress Report</h2>
    </header>
    <div style="border: solid 1px #000; padding:20px"  >
        <div style="display: flex;flex-direction: row;  justify-content: space-between;align-items: center;">   
            <div>
                <h1 style="font-size: 50px;">${reportData.project_name}</h1>
            </div>
            <div>
                <p>Date - ${reportData.date}</p>
                <p>Time - ${reportData.time}</p>
            </div>
        </div><hr />
        <div style="">
            <h2 style="text-align:center; text-decoration: underline;">Manpower</h2>
            <h2 style="text-align:left; text-decoration: underline;">Contractors</h2>
            <div style="display: flex;flex-direction: row;">
              <div style="border: solid 1px #000;padding: 5px;">
                <h2>Ram lal Singh</h2>
                <ol>
                  <li>London</li>
                </ol>
              </div>
           
            </div>
        <div/><hr />
        <div>
            <h2 style="text-align:center; text-decoration: underline;">Exluded Quantity</h2>
            <table style="width:100%">
            <tr>
              <th>Sn.</th>
              <th>Nos</th>
              <th>L</th>
              <th>W</th>
              <th>H</th>
              <th>Unit</th>
              <th>MM</th>
              <th>Qty</th>
              <th>Remarks</th>
            </tr>
            
          </table>

        <div/>
    </div>
</body>
</html>`;

export default ReportPdf;
