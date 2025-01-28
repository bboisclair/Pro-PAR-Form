function submitForm(event) {
  //This will stop the form from clearing upon submission
  event.preventDefault();
  // Retrieve values from all sections
  var form = document.getElementById("myForm");
  var summary = document.getElementById('summary').value;
  var problem = document.getElementById('problem').value;
  var server = document.getElementById('server').value;
  var databaseName = document.getElementById('databaseName').value;
  var clientName = document.getElementById('clientName').value;
  var companyCode = document.getElementById('companyCode').value;
  var ultiproUserID = document.getElementById('ultiproUserID').value;
  var ultiproWebURL = document.getElementById('ultiproWebURL').value;
  var installationBOURL = document.getElementById('installationBOURL').value;
  var appUptime = document.getElementById('appUptime').value;
  var maintWindow = document.getElementById('maintWindow').value;
  var installType = document.getElementById('installType').value;
  var issuser = getSelectedValue(form.elements["issuser"]);
  var impactedUsersRange = document.getElementById('impactedUsersRange').value;
  var reproductionSteps = document.getElementById('reproductionSteps').value;
  var timeframeTrigger = document.getElementById('timeframeTrigger').value;
  var issueOccuring = document.getElementById('issueOccuring').value;
  var issueLocation = getSelectedValue(form.elements["issueLocation"]);
  var datePicker = document.getElementById('datePicker').value;
  var relatedArticle = getSelectedValue(form.elements["relatedArticle"]);
  var relatedJIRA = getSelectedValue(form.elements["relatedJIRA"]);
  var articleJIRA = document.getElementById('articleJIRA').value;

  var missingFields = [];

  //FUNCTION TO GET SELECTED VALUE OF RADIO BUTTONS
  function getSelectedValue(radioButtons) {
    // Loop through radio buttons to find the selected one
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        return radioButtons[i].value;
      }
    }
    // Return null if no radio button is selected
    return null;
  }

  function checkMissingField(field, fieldName) {
    if (!field || field.trim() === "") {
      missingFields.push(fieldName);
    }
  }

  // Check each required field
checkMissingField(summary, 'Issue Summary');
checkMissingField(problem, 'Problem Description');
checkMissingField(server, 'Server');
checkMissingField(databaseName, 'Database Name');
checkMissingField(clientName, 'Client Name');
checkMissingField(companyCode, 'Company Code');
checkMissingField(ultiproUserID, 'Ultipro User ID');
checkMissingField(ultiproWebURL, 'Ultipro Web URL');
checkMissingField(installationBOURL, 'Installation Back Office URL');
checkMissingField(appUptime, 'Application Uptime');
checkMissingField(maintWindow, 'Maintenance Window');
checkMissingField(installType, 'Installation Type');
checkMissingField(issuser, 'Is the issue reproducibile by ISSUSER?');
checkMissingField(impactedUsersRange, 'Who is this impacting?');
checkMissingField(timeframeTrigger, 'Is there a specific time or event that triggers the problem?');
checkMissingField(issueOccuring, 'Where is the issue occurring?');
checkMissingField(issueLocation, 'Is the issue in Production or Test?');
checkMissingField(datePicker, 'When is the customers deadline?');
checkMissingField(relatedArticle, 'I found an article related to my case');
checkMissingField(relatedJIRA, 'I found a JIRA related to my case');
checkMissingField(reproductionSteps, 'Reproduction Steps');

  //IF STATEMENT FOR REQUIRED FIELD CHECK
  if (missingFields.length > 0) {
    alert("Please fill out the following required fields:\n" + missingFields.join('\n'));
  }
  else {
    // Construct the content for the new tab
    var content = `
      <link rel="stylesheet" href="style.css">
    <header>
        <img src="defect_white.png" class="header-icon" title="Defect Icon">
        <h1> PAR Generator for UKG Pro </h1>
        <img src="defect_white.png" class="header-icon" title="Defect Icon">
    </header>
      <script>
      function closeCurrentTab() {
        window.close();
      }
      </script>
      <div id="outputContainer">
        <form id="outputForm">
          <h2>Issue Summary</h2>
          <p>${summary}</p>
          <h2>JIRA Description</h2>
          <p><strong>Problem:</strong><br>=======
          <br>
          ${problem.replace(/\n/g, '<br>')}
          <br>
          <p><strong>ITG/Tenant Details:</strong><br>===============
          <br>
          <strong>Server:</strong> ${server}
          <br>
          <strong>Database Name:</strong> ${databaseName}
          <br>
          <strong>Client Name:</strong> ${clientName}
          <br>
          <strong>Company Code:</strong> ${companyCode}
          <br>
          <strong>UltiPro User ID:</strong> ${ultiproUserID}
          <br>
          <strong>UltiPro Web URL:</strong> ${ultiproWebURL}
          <br>
          <strong>Installation Back Office URL:</strong> ${installationBOURL}
          <br>
          <strong>Application Uptime:</strong> ${appUptime}
          <br>
          <strong>Maintenance Window:</strong> ${maintWindow}
          <br>
          <strong>Install Type:</strong> ${installType}
          <br>
          <p><strong>Escalation Criteria:</strong><br>================
          <br>
          <strong>Is the issue reproducibile by ISSUSER?:</strong> ${issuser}
          <br>
          <strong>Who is this impacting?:</strong> ${impactedUsersRange}
          <br>
          <strong>Is there a specific time or event that triggers the problem?:</strong> ${timeframeTrigger}
          <br>
          <strong>Where is the issue occurring?:</strong> ${issueOccuring}
          <br>
          <strong>Is the issue in Production or Test?:</strong> ${issueLocation}
          <br>
          <strong>When is the clients deadline?:</strong> ${datePicker}
          <p><strong>Articles/JIRAs Reviewed:</strong><br>=====================
          <br>
          <strong>I found an article related to my case:</strong> ${relatedArticle}
          <br>
          <strong>I found a JIRA related to my case:</strong> ${relatedJIRA}
          <br>
          <strong>Article or JIRA Titles/Links:</strong><br> ${articleJIRA.replace(/\n/g, '<br>')}
          <br>
          <h2>Steps to Reproduce</h2>
          ${reproductionSteps.replace(/\n/g, '<br>')}
          <br>
          <div class="buttonSection" id="buttonSection">
            <button type="button" class = "button" onclick="closeCurrentTab(event)">Edit Information</button>
        </form>
      </div>
    `;

    // Open a new tab and write the content
    var newTab = window.open();
    newTab.document.write(content);
    newTab.document.close();
  }
}

function selectComponent(componentName, callback){
  document.getElementById('selectedComponent').textContent = componentName;

  if (typeof callback === 'function') {
    callback();
}
}

function changeBackgroundColor(button) {
  // Get all buttons with the class name 'menuButton'
  var buttons = document.getElementsByClassName('menuButton');

  // Remove background color from all buttons
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = '';
  }

  // Set background color for the clicked button
  button.style.backgroundColor = '#087C79';
}
