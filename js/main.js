var cpu_data;
var gpu_data;
var ram_data;

var padding = 60;
var width = 480;
var height = 400;
var margin = { top: 40, bottom: 40, right: 20, left: 40 };
var innerWidth = width - margin.left - margin.right;
var innerHeight = height - margin.top - margin.bottom;

document.addEventListener('DOMContentLoaded', function () {

    // Loads csv files and stores them
    Promise.all([d3.csv('data/CPU_UserBenchmarks.csv'), d3.csv('data/GPU_UserBenchmarks.csv'), d3.csv('data/RAM_UserBenchmarks.csv')])
        .then(function (values) {
            console.log('data loaded');
            cpu_data = values[0];
            gpu_data = values[1];
            ram_data = values[2];

            //some good ole fashion data wrangling and also sets up the selects
            cpu_data.map(function (d) {
                d["Benchmark"] = +d["Benchmark"];

                var option1 = document.createElement("option");
                option1.value = d["Model"];
                option1.innerHTML = d["Brand"] + " " + d["Model"];
                var option2 = document.createElement("option");
                option2.value = d["Model"];
                option2.innerHTML = d["Brand"] + " " + d["Model"];
                document.getElementById("cpu_1").appendChild(option1);
                document.getElementById("cpu_2").appendChild(option2);
            });
            gpu_data.map(function (d) {
                d["Benchmark"] = +d["Benchmark"];

                var option1 = document.createElement("option");
                option1.value = d["Model"];
                option1.innerHTML = d["Brand"] + " " + d["Model"];
                var option2 = document.createElement("option");
                option2.value = d["Brand"] + " " + d["Model"];
                option2.innerHTML = d["Brand"] + " " + d["Model"];
                document.getElementById("gpu_1").appendChild(option1);
                document.getElementById("gpu_2").appendChild(option2);
            });
            ram_data.map(function (d) {
                d["Benchmark"] = +d["Benchmark"];

                var option1 = document.createElement("option");
                option1.value = d["Model"];
                option1.innerHTML = d["Brand"] + " " + d["Model"];
                var option2 = document.createElement("option");
                option2.value = d["Model"];
                option2.innerHTML = d["Brand"] + " " + d["Model"];
                document.getElementById("ram_1").appendChild(option1);
                document.getElementById("ram_2").appendChild(option2);
            });


            const g = d3.select('#bar_svg_1').append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
            g.append('g')
                .attr('id', 'xAxis');
            g.append('g')
                .attr('id', 'yAxis');

            const g2 = d3.select('#bar_svg_2').append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
            g2.append('g')
                .attr('id', 'xAxis');
            g2.append('g')
                .attr('id', 'yAxis');

            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            draw_chart_1();
            draw_chart_2();
        });
});

function draw_chart_1() {
    var select_cpu_1 = document.getElementById("cpu_1").selectedIndex;
    var select_gpu_1 = document.getElementById("gpu_1").selectedIndex;
    var select_ram_1 = document.getElementById("ram_1").selectedIndex;

    var aggScore = cpu_data[select_cpu_1]["Benchmark"] + gpu_data[select_gpu_1]["Benchmark"] + ram_data[select_ram_1]["Benchmark"];
    document.getElementById("agg_score_1").textContent = +aggScore;


    //d3 stuff
    var data = [
        { name: 'CPU Score', score: cpu_data[select_cpu_1]["Benchmark"], model: cpu_data[select_cpu_1]["Brand"] + " " + cpu_data[select_cpu_1]["Model"], rank: cpu_data[select_cpu_1]["Rank"] },
        { name: 'GPU Score', score: gpu_data[select_gpu_1]["Benchmark"], model: gpu_data[select_gpu_1]["Brand"] + " " + gpu_data[select_gpu_1]["Model"], rank: gpu_data[select_gpu_1]["Rank"] },
        { name: 'RAM Score', score: ram_data[select_ram_1]["Benchmark"], model: ram_data[select_ram_1]["Brand"] + " " + ram_data[select_ram_1]["Model"], rank: ram_data[select_ram_1]["Rank"] }
    ];

    const xScale = d3.scaleBand()
        .domain(data.map(function (d) { return d.name; }))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.score; })])
        .range([innerHeight, 0]);

    var svg = d3.select('#bar_svg_1');

    const g = svg.select('g');

    var div = d3.select("body").select(".tooltip")

    var color = d3.scaleLinear()
        .domain([0, 1, 2])
        .range(['blue', 'green', 'red'])

    var barchart = g.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => xScale(d.name))
        .attr('y', d => yScale(d.score))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.score))
        .style('fill', (d, i) => color(i))
        .style('stroke', 'black')
        .style('stroke-width', '1')
        .on("mousemove", function (event, d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.model + "<br/>" + "Score: " + d.score + "<br/>" + "Rank: " + d.rank)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    const yAxis = d3.axisLeft(yScale);
    g.select('#yAxis').call(yAxis);

    const xAxis = d3.axisBottom(xScale);
    g.select('#xAxis').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
}

function draw_chart_2() {
    var select_cpu_2 = document.getElementById("cpu_2").selectedIndex;
    var select_gpu_2 = document.getElementById("gpu_2").selectedIndex;
    var select_ram_2 = document.getElementById("ram_2").selectedIndex;

    var aggScore = cpu_data[select_cpu_2]["Benchmark"] + gpu_data[select_gpu_2]["Benchmark"] + ram_data[select_ram_2]["Benchmark"];
    document.getElementById("agg_score_2").textContent = +aggScore;


    //d3 stuff
    var data = [
        { name: 'CPU Score', score: cpu_data[select_cpu_2]["Benchmark"], model: cpu_data[select_cpu_2]["Brand"] + " " + cpu_data[select_cpu_2]["Model"], rank: cpu_data[select_cpu_2]["Rank"] },
        { name: 'GPU Score', score: gpu_data[select_gpu_2]["Benchmark"], model: gpu_data[select_gpu_2]["Brand"] + " " + gpu_data[select_gpu_2]["Model"], rank: gpu_data[select_gpu_2]["Rank"] },
        { name: 'RAM Score', score: ram_data[select_ram_2]["Benchmark"], model: ram_data[select_ram_2]["Brand"] + " " + ram_data[select_ram_2]["Model"], rank: ram_data[select_ram_2]["Rank"] }
    ];

    const xScale = d3.scaleBand()
        .domain(data.map(function (d) { return d.name; }))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.score; })])
        .range([innerHeight, 0]);

    var svg = d3.select('#bar_svg_2');

    const g = svg.select('g');

    var div = d3.select("body").select(".tooltip")

    var color = d3.scaleLinear()
        .domain([0, 1, 2])
        .range(['blue', 'green', 'red'])

    var barchart = g.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => xScale(d.name))
        .attr('y', d => yScale(d.score))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.score))
        .style('fill', (d, i) => color(i))
        .style('stroke', 'black')
        .style('stroke-width', '1')
        .on("mousemove", function (event, d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.model + "<br/>" + "Score: " + d.score + "<br/>" + "Rank: " + d.rank)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    const yAxis = d3.axisLeft(yScale);
    g.select('#yAxis').call(yAxis);

    const xAxis = d3.axisBottom(xScale);
    g.select('#xAxis').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
}
