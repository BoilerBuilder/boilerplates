export const getPeopleById = async (id) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);

  if (!response.ok) {
    throw new Error({ status: response.status, message: response.statusText });
  }

  return response.json();
};
