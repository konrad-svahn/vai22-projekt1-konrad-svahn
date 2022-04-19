console.log('load');

const canvas = document.querySelector("#canvas2");
const context = canvas.getContext("2d");
document.querySelector("#inFile").addEventListener("change", (event) => handleFile(event));
document.querySelector("#rgb").addEventListener("change", (event) => changeVisible());


function handleFile (event) {
    const reeder = new FileReader();
    reeder.readAsDataURL(event.target.files[0]);
    
    reeder.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
            canvas.height = img.height;
            canvas.width = img.width;
            context.drawImage(img,0,0, canvas.width, canvas.height);
            const imgData = context.getImageData(0, 0, img.width, img.height);
            makeGraph (imgData);
        }
    }
}

function makeGraph (imgData) {
    console.log(imgData);
    const numberOfPixels = imgData.data.length/4;
    const mod = numberOfPixels / 10000;  
    const length = 256;

    const redData = Array();
    const blueData = Array();
    const greenData = Array();

    for (let i = 0; i < length; i+=1) {
        redData[i] = 0;
        blueData[i] = 0;
        greenData[i] = 0;
    }
    
    for (let i = 3; i < imgData.data.length;i += 4) {
        redData[imgData.data[i-3]] +=1;
        greenData[imgData.data[i-2]] += 1;
        blueData[imgData.data[i-1]] += 1;
    }

    console.log(redData);

    const width = 600, height = 400, barMargin = -1;
    const barWidth = (width - barMargin) / length;

    const chart = d3.select("#canvas1")
    .append('svg')
        .attr('height', height)
        .attr('width', width)
        .style('background', 'black');
    
    chart.selectAll('rect1')
        .data(redData).enter()
            .append('rect')
                .attr("x", function(d,i){return i * barWidth + barMargin})
                .attr("y",(d) => height-d/mod)
                .attr("width", barWidth-barMargin)
                .attr("height", (d) => d/mod)
                .attr('fill', '#FF0000')
                .attr("class", "rectR")
                .style("mix-blend-mode","screen");
    
    chart.selectAll('rect2')
        .data(greenData).enter()
            .append('rect')
                .attr("x", function(d,i){return i * barWidth + barMargin})
                .attr("y",(d) => height-d/mod)
                .attr("width", barWidth-barMargin)
                .attr("height", (d) => d/mod)
                .attr('fill', '#00FF00')
                .attr("class", "rectG")
                .style("mix-blend-mode","screen");

    chart.selectAll('rect3')
        .data(blueData).enter()
            .append('rect')
                .attr("x", function(d,i){return i * barWidth + barMargin})
                .attr("y",(d) => height-d/mod)
                .attr("width", barWidth-barMargin)
                .attr("height", (d) => d/mod)
                .attr('fill', '#0000FF')
                .attr("class", "rectB")
                .style("mix-blend-mode","screen");
    changeVisible();
}

function changeVisible () {
    const red = document.getElementsByClassName("rectR");
    const green = document.getElementsByClassName("rectG");
    const blue = document.getElementsByClassName("rectB");

    const table = document.getElementById("rgb");
    const selected = table.options[table.selectedIndex].value;
    
    if (selected == "red") {
        for (let i = 0; i < red.length; i++) {
            red[i].style.visibility = "visible";
        }
        for (let i = 0; i < green.length; i++) {
            green[i].style.visibility = "hidden";
        }
        for (let i = 0; i < blue.length; i++) {
            blue[i].style.visibility = "hidden";
        }
    }

    if (selected == "green") {
        for (let i = 0; i < red.length; i++) {
            red[i].style.visibility = "hidden";
        }
        for (let i = 0; i < green.length; i++) {
            green[i].style.visibility = "visible";
        }
        for (let i = 0; i < blue.length; i++) {
            blue[i].style.visibility = "hidden";
        }
    }

    if (selected == "blue") {
        for (let i = 0; i < red.length; i++) {
            red[i].style.visibility = "hidden";
        }
        for (let i = 0; i < green.length; i++) {
            green[i].style.visibility = "hidden";
        }
        for (let i = 0; i < blue.length; i++) {
            blue[i].style.visibility = "visible";
        }
    }

    if (selected == "all") {
        for (let i = 0; i < red.length; i++) {
            red[i].style.visibility = "visible";
        }
        for (let i = 0; i < green.length; i++) {
            green[i].style.visibility = "visible";
        }
        for (let i = 0; i < blue.length; i++) {
            blue[i].style.visibility = "visible";
        }
    }
}