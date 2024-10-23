const BASE_URL = "https://changemyclothes.evolutio.io";

async function changeClothes(imageBase64: string, prompt: string) {
  const requestBody = {
    image: imageBase64,
    prompt: prompt,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/changeclothes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error changing clothes:", error);
    throw error;
  }
}

export { changeClothes };
