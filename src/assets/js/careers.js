$(function () {
    var apiUrl = 'https://api.lever.co/v0/postings/getdor?mode=html';
    var $jobsContainer = $('#jobs-container');

    if ($jobsContainer.length) {        
        $.get(apiUrl, function (jobsHtml) {
            $jobsContainer.html(jobsHtml);
        });
    }
});
