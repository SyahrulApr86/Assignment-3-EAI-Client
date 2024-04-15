$(document).ready(function() {
    $('#userForm').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $('#submitButton').click();
        }
    });

    $('#submitButton').click(function() {
        $('#loading').show();
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: $('#name').val(),
                role: $('#role').val()
            }),
            success: function(response) {
                $('#result').html(`<pre>${JSON.stringify(response, null, 2)}</pre>`);
                displayUserInfo(response);
                $('#loading').hide();
            },
            error: function(xhr, status, error) {
                $('#result').html("Error: " + error);
                $('#loading').hide();
            }
        });
    });

    function displayUserInfo(data) {
        let content = `<div class="card mb-3" style="max-width: 540px;">
                           <div class="row g-0">
                               <div class="col-md-4">
                                   <img src="${data.image}" class="img-fluid rounded-start" alt="${data.name}">
                               </div>
                               <div class="col-md-8">
                                   <div class="card-body">
                                       <h5 class="card-title">${data.name}</h5>`;

        if (data.age) {
            content += `<p class="card-text"><small class="text-muted">Age: ${data.age}</small></p>`;
        }
        if (data.gender) {
            content += `<p class="card-text"><small class="text-muted">Gender: ${data.gender}</small></p>`;
        }
        if (data.hobby) {
            content += `<p class="card-text">Hobby: ${data.hobby}</p>`;
        }
        if (data.quote) {
            content += `<p class="card-text"><i>"${data.quote}"</i></p>`;
        }
        content += `           </div>
                               </div>
                           </div>
                       </div>`;

        $('#result').html(content);
    }
});
