async function loadVideos(shuffle = false, limit = null) {
  const container = document.querySelector('#video-gallery-container');
  if (!container) {
    console.error('No container found for video gallery');
    return;
  }

  try {
    const response = await fetch('music-data.json');
    const videos = await response.json();

    let videoList = [...videos]; // Clone array from jason

    if (shuffle) {
      videoList = videoList.sort(() => 0.5 - Math.random());
    }


    if (limit !== null && limit > 0) {
      videoList = videoList.slice(0, limit);
    }

    container.innerHTML = ''; // Clear existing

    videoList.forEach(video => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-sm-6 col-lg-4 mb-4';

      const cardDiv = document.createElement('div');
      cardDiv.className = 'card video-card';

      const videoContainer = document.createElement('div');
      videoContainer.className = 'video-container';

      const iframe = document.createElement('iframe');
      iframe.src = video.src;
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;

      videoContainer.appendChild(iframe);

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body text-center';

      const title = document.createElement('h5');
      title.className = 'card-title';
      title.textContent = video.title;

      cardBody.appendChild(title);

      cardDiv.appendChild(videoContainer);
      cardDiv.appendChild(cardBody);
      colDiv.appendChild(cardDiv);

      container.appendChild(colDiv);
    });
  } catch (error) {
    console.error('Error loading videos:', error);
  }
}