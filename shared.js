let eventKeys = {dataUpdated: 'dataUpdated'};
let storageKeys = {per_minute: 'workout-per_minute', per_day: 'workout-per_day'};

let listItemBgs = ['lh-condensed', 'bg-light'];

let chart_colors = {
    calories: "#cd455a",
    calories_dark: "#cd0d1f",
    minutes: "#3e95cd",
    minutes_dark: "#155ecd",
    distance: "#5fcd59",
    distance_dark: "#25cd01",
    level: "#9f9f9f",
    level_dark: "#6a6a6a",
    rpm: '#ff51ee',
    rpm_dark: '#8d008f'
};

function getPersistedData(key = storageKeys.per_minute) {
    console.log(`getPersistedData(${key})`);
    let persistedData = JSON.parse(localStorage.getItem(key));
    persistedData = persistedData === undefined || persistedData === null ? [] : persistedData;
    console.log(`getPersistedData(${key})`, persistedData);
    return persistedData;
}

function setPersistedData(persistedData, key = storageKeys.per_minute) {
    localStorage.setItem(key, JSON.stringify(persistedData));
    $("body").trigger(eventKeys.dataUpdated, [key, persistedData]);
}

function buildOptsData(label) {
    label = label.toLowerCase();
    let camel = label.charAt(0).toUpperCase() + label.substr(1);
    return {
        type: 'line',
        yAxisID: label,
        label: camel,
        data: [],
        pointRadius: 3,
        fill: false,
        lineTension: 0,
        borderWidth: 2,
        borderColor: chart_colors[`${label}`],
        pointBorderColor: chart_colors[`${label}_dark`]
    }
};

function buildOptsAxis(label, position = 'left') {
    label = label.toLowerCase();
    let camel = label.charAt(0).toUpperCase() + label.substr(1);
    return {
        id: label,
        type: 'linear',
        position: position,
        scaleLabel: {
            display: true,
            labelString: camel
        },
        ticks: {
            fontColor: chart_colors[`${label}`]
        }
    }
};