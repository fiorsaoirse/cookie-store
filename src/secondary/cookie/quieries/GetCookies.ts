export const GET_COOKIES_QUERY = `query CookieQuery($f: Filter!) {
    cookies(filter: $f) {
      title,
      description,
      toppings {
        name
      },
      price,
      rating
    }
  }`;
