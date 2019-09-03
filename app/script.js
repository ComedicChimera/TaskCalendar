window.$ = require('jquery');
const fs = require('fs');

let table;

function loadTable() {
    let data = JSON.parse(fs.readFileSync('data.json'));

    $('.title').html(sanitize(data['title']));

    return data['calendar'];
}

function generateTable() {
    let html = '<tr><td></td>';
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (var day of days) {
        html += `<th>${day}</th>`;
    }

    html += '</tr>';

    let week;
    for (var i in table) {
        week = table[i];

        html += `<tr><th class=\"week-label\" contenteditable=\"true\">${week['week']}</th>`;

        let dayContent;
        for (var j = 0; j < 7; j++) {
            dayContent = j < week['days'].length ? week['days'][j] : '';

            html += `<td><textarea class=\'entry-box ${i}-${j}\'>${sanitize(dayContent)}</textarea></td>`;
        }

        html += '</tr>';
    }

    $('table').html(html);
}

function updateTable() {
    for (var item of $('.entry-box').toArray()) {
        let loc = item.classList[1].split('-').map((e) => parseInt(e));

        let i = loc[0], j = loc[1];
        let days = table[i]['days'];

        if (days.length <= j) {
            for (var k = days.length - 1; k < j; k++)
                days.push('');
        }

        days[j] = item.value;
    }

    let weeks = $('.week-label').toArray();

    for (var i in weeks) {
        table[i]['week'] = weeks[i].innerHTML;
    }
}

function saveTable() {
    updateTable();

    fs.writeFileSync('data.json', JSON.stringify({ 'title': $('.title').html(), 'calendar': table }));
}

function sanitize(text) {
    let dp = new DOMParser();

    return dp.parseFromString(text, "text/html").documentElement.textContent;
}

function setUnsaved() {
    $('.save').addClass('unsaved');
}

function setupListeners() {
    $('.save').mousedown(() => {
        saveTable();

        $('.save').removeClass('unsaved');
    });

    $('.add-week').mousedown(() => {
        updateTable();

        table.push({'week': '', 'days': []});

        generateTable();

        setUnsaved();
    });

    $('.remove-week').mousedown(() => {
        updateTable();

        table.pop();

        generateTable();

        setUnsaved();
    });

    $('.clear-calendar').mousedown(() => {
        table = [];

        generateTable();

        setUnsaved();
    });

    // note changes
    $('.entry-box').bind('input propertychange', setUnsaved);

    $('.week-label').bind('input propertychange', setUnsaved);

    $('.title').bind('input propertychange', setUnsaved);

    $(window).keydown((e) => {
        if (e.ctrlKey && e.which == 83) {
            saveTable();

            $('.save').removeClass('unsaved');
        }
    });
}