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


  let time = 20; 
  const timerElement = document.getElementById('timer');
  
  const updateTimer = () => {
    let minutes = Math.floor(time / 20);
    let seconds = time % 20;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (time > 0) {
      time--;
      setTimeout(updateTimer, 1000);
    }
  };

  updateTimer();