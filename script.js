

    function displayQuizPage() {
    const name = document.getElementById("name").value;
    
    window.location.href = `quiz.html?name=${encodeURIComponent(name)}`;
    return false;
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const name = getQueryParam("name");
  document.getElementById("nameoutput").textContent = name || "No name found.";