function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    // buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var samples = data.samples; 

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = resultArray[0];
    // console.log(firstSample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = Object.values(firstSample.otu_ids);
    var sampleValues = Object.values(firstSample.sample_values);
    var otuLabels = Object.values(firstSample.otu_labels);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).reverse().map(ids => "OTU" + ids);
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x:sampleValues.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h",
      text: otuLabels,
      marker: {
        color: 'rgba(55,128,191,0.6)',
        width: 1
      }
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>"
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)
  });
}

// Deliverable 2

// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var samples = data.samples; 
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
   
    var firstSample = resultArray[0];
    console.log(firstSample);
    
    var otuIds = Object.values(firstSample.otu_ids);
    console.log(otuIds);
    var sampleValues = Object.values(firstSample.sample_values);
    console.log(sampleValues);
    var otuLabels = Object.values(firstSample.otu_labels);
    var yticks = otuIds.slice(0,10).reverse().map(ids => "OTU" + ids);

    var barData = [{
      x:sampleValues.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h",
      text: otuLabels,
      marker: {
        color: 'rgba(55,128,191,0.6)',
        width: 1
      }
    }];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };


    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y:sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
      size: sampleValues,
      colorscale: "Portland",
      color: otuIds}
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: '<b>Bacteria Cultures Per Sample</b>',
      xaxis: {
        title: "OTU ID",
        dtick: 500
    }
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}

// Deliverable 3

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples; 
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultSampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultMetaArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var firstSample = resultSampleArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var firstMeta = resultMetaArray[0];

    // 3. Create a variable that holds the washing frequency.
    var wfreq = resultMetaArray.map(person => person.wfreq);
   
    // Create the yticks for the bar chart.
    var otuIds = Object.values(firstSample.otu_ids);
    var sampleValues = Object.values(firstSample.sample_values);
    var otuLabels = Object.values(firstSample.otu_labels);
    var yticks = otuIds.slice(0,10).reverse().map(ids => "OTU" + ids);

    var barData = [{
      x:sampleValues.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h",
      text: otuLabels,
      marker: {
        color: 'rgba(55,128,191,0.6)',
        width: 1
      }
    }];

    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>",
      "titlefont": {"size": 20}
    };
    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    var bubbleData = [{
      x: otuIds,
      y:sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
      size: sampleValues,
      colorscale: "Portland",
      color: otuIds}
    }];

    var bubbleLayout = {
      title: '<b>Bacteria Cultures Per Sample</b>',
      "titlefont": {"size": 20},
      xaxis: {
        title: "OTU ID",
        dtick: 500
      }
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domin:wfreq,
      type: "indicator",
      mode: "gauge+number",
      value: parseInt(wfreq),
      title: {text: "Scrubs per Week"},
      "titlefont": {"size": 18},
      plot_bgcolor:"black",
      gauge: {
        axis: {range: [null,10]},
        bar: {color: "steelblue"},
        steps:[
          {range: [0,2], color: "tomato"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "gold"},
          {range: [6,8], color: "yellowgreen"},
          {range: [8,10], color: "forestgreen"}
        ]
    }
    }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      title: "<b>Belly Button Washing Frequency</b>", 
      "titlefont": {"size": 20}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData,gaugeLayout);
  });
}