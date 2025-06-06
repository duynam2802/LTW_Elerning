// BÀI 1

function dinhDangNgay(dateStr) {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    // console.log(parts);

    let [day, month, year] = parts.map(Number);

    // console.log(day, month, year);

    if (!day || !month || !year) return null;

    const date = new Date(year, month - 1, day);

    console.log(date);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    const mm = month.toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');

    return `${year}-${mm}-${dd}`;
}

// console.log(dinhDangNgay("01/06/2024")); 
// console.log(dinhDangNgay("31/02/2025"));
// console.log(dinhDangNgay("32/06/2025"))


// BÀI 10
function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        readFile(file, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}



// BÀI 11

function fetchAll(urls) {
    const promises = urls.map(function (url) {
        return fetch(url).then(function (response) {
            return response.json();
        });
    });

    return Promise.all(promises).then(function (results) {
        return results;
    });
}

const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
];

fetchAll(urls).then(function (data) {
    console.log("Kết quả:", data);
});




