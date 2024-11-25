export default defineNuxtPlugin(async () => {
  const existingCurrencyList = sessionStorage.getItem("currencyList");
  if (isObjectEmpty(existingCurrencyList)) {
    try {
      const { data: currencyData } = await useCustomFetch<{
        response: {};
        message: string;
      }>("/currency");

      if (currencyData.value) {
        sessionStorage.setItem(
          "currencyList",
          JSON.stringify(currencyData?.value.response)
        );
      }
    } catch (error) {}
  }

  try {
    let userLocation = (await $fetch("https://ip2c.org/s")) as string;
    if (userLocation) {
      const userIsoCode = userLocation.split(";")[2];
      return {
        provide: {
          userIsoCode: userIsoCode,
        },
      };
    }
  } catch (error) {}
});
