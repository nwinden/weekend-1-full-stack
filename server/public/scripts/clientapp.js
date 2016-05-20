$(function() {

  addToDom();

  updateMonthlyCost();

  $('.addEmployee').on('click', addEmployee);

  $('.target-container').on('click','.setInactive', setInactive);

  $('.target-container').on('click','.setActive', setActive);

});

function addEmployee() {

  var employee = {};

  $.each($('.employee-data').serializeArray(), function (i,field) {

    employee[field.name] = field.value;

  });

  employee.active_status = true;

  $.post('/employee', employee, function() {

    addToDom();
    updateMonthlyCost();
    $('.employee-data').find("input[type=text], textarea").val("");
    $('.employee-data').find("input[type=number], textarea").val("");

  });

}

function setInactive() {

  var employee = $(this).parent().data('employeeID');

  employee.active_status = false;

  $.ajax({
    type:'PUT',
    url:'/employee',
    data:employee,
    success: function() {

      addToDom();
      updateMonthlyCost();

    }
  });

}

function setActive() {

  var employee = $(this).parent().data('employeeID');

  employee.active_status = true;

  $.ajax({
    type:'PUT',
    url:'/employee',
    data:employee,
    success: function() {

      addToDom();
      updateMonthlyCost();

    }
  });

}

function addToDom() {



  $.get('/employee', function(employees) {

    var $el = $('.target-container');

    $el.empty();

    employees.forEach(function(employee) {
      if (employee.active_status == true) {
        $el.append('<div class="' + employee.id + '" >' +
                   '<ul><li>' + employee.first_name + ' ' +
                   employee.last_name + '</li>' +
                   '<li>Employee ID: ' + employee.id_number + '</li>' +
                   '<li>Job Title: ' + employee.job_title + '</li>' +
                   '<li>Salary: $' + employee.salary + '</li></ul>' +
                   '<button type="button" class="setInactive">Set Inactive</button></div>'
                  );
        $('.' + employee.id).data('employeeID', employee);
      } else {
        $el.append('<div class="' + employee.id + '" >' +
                   '<ul><li>' + employee.first_name + ' ' +
                   employee.last_name + '</li></ul>' +
                   '<button type="button" class="setActive">Set Active</button></div>'
                  );
        $('.' + employee.id).data('employeeID', employee);
      }
    });
  });
}

function updateMonthlyCost() {

  $.get('/employee', function(employees) {

    var $el = $('.monTotal');
    var monthlyCost = 0;

    employees.forEach(function(employee) {

      if(employee.active_status == true){
      monthlyCost += employee.salary;
      }

    });

    $el.text((monthlyCost/12).toFixed(2));

  });

}
