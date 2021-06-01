import { Button, ButtonGroup } from "@material-ui/core";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";

LineChart.propTypes = {};

const generateOptions = (data) => {
    const categories = data.map((item) =>
        moment(item.Date).format("DD/MM/YYYY")
    );

    return {
        chart: {
            height: 500,
        },
        title: {
            text: "Tổng ca nhiễm",
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ["#F3585B"],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: "right",
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: "</table>",
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: "Tổng Ca nhiễm",
                data: data.map((item) => item.Confirmed),
            },
        ],
    };
};

function LineChart({ report }) {
    const [options, setOptions] = useState({});
    const [selectedDate, setSelectedDate] = useState("all");

    useEffect(() => {
        let customData = [];
        switch (selectedDate) {
            case "all":
                customData = report;
                break;
            case "30":
                customData = report.slice(report.length - 30);
                break;
            case "7":
                customData = report.slice(report.length - 7);
                break;
            default:
                customData = report;
                break;
        }
        setOptions(generateOptions(customData));
    }, [report, selectedDate]);

    return (
        <>
            <ButtonGroup
                size="small"
                style={{ display: "flex", justifyContent: "flex-end" }}
            >
                <Button
                    color={selectedDate === "all" ? "secondary" : ""}
                    onClick={() => setSelectedDate("all")}
                >
                    Tất cả
                </Button>
                <Button
                    color={selectedDate === "30" ? "secondary" : ""}
                    onClick={() => setSelectedDate("30")}
                >
                    30 ngày
                </Button>
                <Button
                    color={selectedDate === "7" ? "secondary" : ""}
                    onClick={() => setSelectedDate("7")}
                >
                    7 ngày
                </Button>
            </ButtonGroup>
            <HighchartsReact hightcharts={Highchart} options={options} />
        </>
    );
}

export default LineChart;
