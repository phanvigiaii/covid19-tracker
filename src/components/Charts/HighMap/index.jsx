import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";
import React, { useEffect, useRef, useState } from "react";

// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
    chart: {
        height: "500",
    },
    title: {
        text: null,
    },
    mapNavigation: {
        enabled: true,
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, "#FFC4AA"],
            [0.4, "#FF8A66"],
            [0.6, "#FF392B"],
            [0.8, "#B71525"],
            [1, "	#7A0826"],
        ],
    },
    legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "bottom",
    },
    series: [
        {
            mapData: {},
            name: "Số ca nhiễm",
            joinBy: ["hc-key", "key"],
        },
    ],
};

function HighMap({ reportCountry }) {
    const [options, setOptions] = useState({});
    const [mapLoaded, setMapLoaded] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        if (reportCountry && Object.keys(reportCountry).length) {
            const fakeData = reportCountry.features.map((feature, index) => ({
                key: feature.properties["hc-key"],
                value: index,
            }));

            setOptions(() => ({
                ...initOptions,
                title: {
                    text: reportCountry.title,
                },
                series: [
                    {
                        ...initOptions.series[0],
                        mapData: reportCountry,
                        data: fakeData,
                    },
                ],
            }));

            if (!mapLoaded) setMapLoaded(true);
        }
    }, [reportCountry, mapLoaded]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData: reportCountry,
            });
        }
    }, [options, reportCountry]);

    if (!mapLoaded) return null;

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={cloneDeep(options)}
            constructorType={"mapChart"}
            ref={chartRef}
        />
    );
}

export default React.memo(HighMap);
