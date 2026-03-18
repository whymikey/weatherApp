export async function fetchWeatherData(url) {
    try {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('error')
    }

    const data = await response.json()
    return data

    } catch (error) {
        console.error(error)
        return null
    }
}