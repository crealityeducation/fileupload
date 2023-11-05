var myChart;
function handleFileSelect() {
  console.log("### File processing begins ", new Date());
  var file = document.getElementById("the_file").files;
  console.log("### files ", file.length);
  if (file.length > 0) {
    _.forEach(file, (f, k) => {
      var reader = new FileReader();
      reader.onloadend = (e) => {
        const data = e.target.result.split(",");
        const obj = {
          fileName: f.files[i].name,
          mimeType: data[0],
          data: data[1],
        };
        console.log(JSON.stringify(obj));
      };
      reader.readAsDataURL(f);
      $("#the_file").val("");
      hidespin();
    });
  }
}

async function prcssJSONDS(f) {
  let chds = JSON.parse(f.target.result);
  chds = chds.scriptds;
  console.log(chds);
  chds.ds = JSON.stringify(dohlcobj(chds.ds));
  console.log("### async processing of file ", chds);
  //processDT(chds);
}
