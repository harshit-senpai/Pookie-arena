const axios2 = require("axios");

const BACKEND_URL = "http://localhost:8080";
const WS_URL = "ws://localhost:3001";

const axios = {
  post: async (...args) => {
    try {
      const res = await axios2.post(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  get: async (...args) => {
    try {
      const res = await axios2.get(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  put: async (...args) => {
    try {
      const res = await axios2.put(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  delete: async (...args) => {
    try {
      const res = await axios2.delete(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
};

describe("Authentication Suite", () => {
  test("User is able to sign up only once", async () => {
    const username = "kirat" + Math.random();
    const password = "123456789";
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expect(response.status).toBe(200);

    const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expect(updatedResponse.status).toBe(400);
  });

  test("Signup request fails if the username is empty", async () => {
    const username = `kirat-${Math.random()}`; // kirat-0.12312313
    const password = "123456789";

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      password,
    });

    expect(response.status).toBe(400);
  });

  test("Signin succeeds if the username and password are correct", async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456789";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });

  test("Signin fails if the username and password are incorrect", async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456789";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      role: "admin",
    });

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: "WrongUsername",
      password,
    });

    expect(response.status).toBe(403);
  });
});

describe("user metaData endpoints", () => {
  let token = "";
  let avatarId = "";

  beforeAll(async () => {
    const username = `Senpai-${Math.random()}`;
    const password = "123456789";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      role: "admin",
    });

    const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
      username,
      password,
    });

    token = response.data.token;

    const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
      imageUrl: "https://image.com/avatar1.png",
      name: "Timmy",
    });

    avatarId = avatarResponse.data.avatarId;
  });

  test("user can't update their metaData with wrong avatar ID", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/metaData`,
      {
        avatarId: "123456789",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(400);
  });

  test("user can update their metaData with right avatar ID", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/v1/user/metaData`,
      {
        avatarId,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(200);
  });

  test("user is not able to update their metaData if the auth header is not provided", async () => {
    const response = await axios.post(`${BACKEND_URL}/v1/user/metaData`, {
      avatarId,
    });

    expect(response.statusCode).toBe(403);
  });
});

describe("User avatar information", () => {
  let avatarId = "";
  let token = "";
  let userId = "";

  beforeAll(async () => {
    const username = `Senpai-${Math.random()}`;
    const password = "123456789";

    const signupResponse = await axios.post(`${BACKEND_URL}/v1/signup`, {
      username,
      password,
      role: "admin",
    });

    userId = signupResponse.data.userId;

    const response = await axios.post(`${BACKEND_URL}/v1/login`, {
      username,
      password,
    });

    token = response.data.token;

    const avatarResponse = await axios.post(
      `${BACKEND_URL}/v1/admin/avatar`,
      {
        imageUrl: "https://image.com/avatar1.png",
        name: "Timmy",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    avatarId = avatarResponse.data.avatarId;
  });

  test("Get back avatar information for a user", async () => {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/user/metaData/bulk?ids=[${avatarId}]`
    );
    expect(response.data.avatars.length).toBe(1);
    expect(response.data.avatars[0].userId).toBe(userId);
  });

  test("Available avatars lists the recently created avatars", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/avatars`);
    expect(response.data.avatars.length).not.toBe(0);
    const currentAvatar = response.data.avatars.find((x) => x.id === avatarId);
    expect(currentAvatar).toBeDefined();
  });
});

describe("Space information", () => {
  let adminToken;
  let mapId;
  let element1Id;
  let element2Id;
  let adminId;
  let userId;
  let userToken;

  beforeAll(async () => {
    const username = `Senpai-${Math.random()}`;
    const password = "123456";

    const signupResponse = await axios.post(`${BACKEND_URL}/v1/signup`, {
      username: username,
      password,
      role: "admin",
    });

    adminId = signupResponse.data.userId;

    const response = await axios.post(`${BACKEND_URL}/v1/login`, {
      username: username,
      password,
    });

    adminToken = response.data.token;

    const userSignupResponse = await axios.post(`${BACKEND_URL}/v1/signup`, {
      username: username + "-user",
      password,
      role: "user",
    });

    userId = userSignupResponse.data.userId;

    const userResponse = await axios.post(`${BACKEND_URL}/v1/login`, {
      username: username + "-user",
      password,
    });

    userToken = userResponse.data.token;

    const element1Response = await axios.post(
      `${BACKEND_URL}/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        static: false,
        height: 1,
        width: 1,
      },
      {
        Authorization: `Bearer ${adminToken}`,
      }
    );

    const element2Response = await axios.post(
      `${BACKEND_URL}/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        static: false,
        height: 1,
        width: 1,
      },
      {
        Authorization: `Bearer ${adminToken}`,
      }
    );

    element1Id = element1Response.data.id;
    element2Id = element2Response.data.id;

    const mapResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "100 person interview room",
        defaultElements: [
          {
            elementId: element1Id,
            x: 20,
            y: 20,
          },
          {
            elementId: element1Id,
            x: 18,
            y: 20,
          },
          {
            elementId: element2Id,
            x: 19,
            y: 20,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    mapId = mapResponse.id;
  });

  test("User is able to create a space", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: mapId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(response.data.spaceId).toBeDefined();
  });

  test("User is able to create a space without mapId (empty space)", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(response.data.spaceId).toBeDefined();
  });

  test("User is not able to create a space without mapId and a dimensions", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(response.statusCode).toBe(400);
  });

  test("User is not able to delete a space that does not exist", async () => {
    const response = await axios.delete(
      `${BACKEND_URL}/api/v1/space/randomIdDoesNotExist`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(response.statusCode).toBe(400);
  });

  test("User is able to delete a space that does exist", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const deleteResponse = await axios.delete(
      `${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(deleteResponse.statusCode).toBe(200);
  });

  test("User should not be able to delete a space created by another user", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const deleteResponse = await axios.delete(
      `${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    expect(deleteResponse.statusCode).toBe(400);
  });

  test("Admin has no space initially", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`);
    expect(response.data.spaces.length).toBe(0);
  });
  test("user has no spaces initially", async () => {
    const spaceCreateResponse = await axios.post(
      `${BACKEND_URL}/api/v1/space/all`,
      {
        name: "test",
        dimensions: "100x200",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const filteredSpaces = response.data.spaces.find(
      (x) => x.id === spaceCreateResponse.spaceId
    );
    expect(response.data.spaces.length).toBe(0);
    expect(filteredSpaces).toBeDefined();
  });
});

describe("Arena Endpoints", () => {
  let adminToken;
  let mapId;
  let element1Id;
  let element2Id;
  let adminId;
  let userId;
  let userToken;
  let spaceId;

  beforeAll(async () => {
    const username = `Senpai-${Math.random()}`;
    const password = "123456";

    const signupResponse = await axios.post(`${BACKEND_URL}/v1/signup`, {
      username: username,
      password,
      role: "admin",
    });

    adminId = signupResponse.data.userId;

    const response = await axios.post(`${BACKEND_URL}/v1/login`, {
      username: username,
      password,
    });

    adminToken = response.data.token;

    const userSignupResponse = await axios.post(`${BACKEND_URL}/v1/signup`, {
      username: username + "-user",
      password,
      role: "user",
    });

    userId = userSignupResponse.data.userId;

    const userResponse = await axios.post(`${BACKEND_URL}/v1/login`, {
      username: username + "-user",
      password,
    });

    userToken = userResponse.data.token;

    const element1Response = await axios.post(
      `${BACKEND_URL}/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        static: false,
        height: 1,
        width: 1,
      },
      {
        Authorization: `Bearer ${adminToken}`,
      }
    );

    const element2Response = await axios.post(
      `${BACKEND_URL}/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        static: false,
        height: 1,
        width: 1,
      },
      {
        Authorization: `Bearer ${adminToken}`,
      }
    );

    element1Id = element1Response.data.id;
    element2Id = element2Response.data.id;

    const mapResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "100 person interview room",
        defaultElements: [
          {
            elementId: element1Id,
            x: 20,
            y: 20,
          },
          {
            elementId: element1Id,
            x: 18,
            y: 20,
          },
          {
            elementId: element2Id,
            x: 19,
            y: 20,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    mapId = mapResponse.id;

    const spaceResponse = await axios.post(
      `${BACKEND_URL}/api/v1/`,
      {
        name: "test",
        dimensions: "100x200",
        mapId: mapId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    spaceId = spaceResponse.data.spaceId;
  });

  test("Incorrect spaceId return a 400", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/space/123dwrer`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    expect(response.statusCode).toBe(400);
  });

  test("Correct spaceId returns all the elements", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    expect(response.data.dimensions).toBe("100x200");
    expect(response.data.elements.length).toBe(3);
  });

  test("Delete endpoint is able to delete an element", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/space/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    await axios.delete(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        spaceId: spaceId,
        elementId: response.data.elements[0].id,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    expect(newResponse.data.elements.length).toBe(2);
  });

  test("Adding an element fails if the element lies outside the dimensions", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        spaceId: spaceId,
        elementId: element1Id,
        x: 1000,
        y: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(response.statusCode).toBe(400);
  });

  test("Adding an element to works as expected", async () => {
    await axios.post(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        spaceId: spaceId,
        elementId: element1Id,
        x: 10,
        y: 60,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    expect(newResponse.data.elements.length).toBe(3);
  });
});

describe("Admin Endpoints", () => {
  let adminToken;
  let adminId;
  let userToken;
  let userId;

  beforeAll(async () => {
    const username = `Senpai-${Math.random()}`;
    const password = "123456";

    const signupResponse = await axios.post(`${BACKEND_URL}/v1/signup`, {
      username: username,
      password,
      role: "admin",
    });

    adminId = signupResponse.data.userId;

    const response = await axios.post(`${BACKEND_URL}/v1/login`, {
      username: username,
      password,
    });

    adminToken = response.data.token;

    const userSignupResponse = await axios.post(`${BACKEND_URL}/v1/signup`, {
      username: username + "-user",
      password,
      role: "user",
    });

    userId = userSignupResponse.data.userId;

    const userResponse = await axios.post(`${BACKEND_URL}/v1/login`, {
      username: username + "-user",
      password,
    });

    userToken = userResponse.data.token;
  });

  test("User is not able to hit admin endpoint", async () => {
    const elementResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const mapResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        defaultElements: [],
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const avatarResponse = await axios.post(
      `${BACKEND_URL}/v1/admin/avatar`,
      {
        imageUrl: "https://image.com/avatar1.png",
        name: "Timmy",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const updateElementResponse = await axios.put(
      `${BACKEND_URL}/api/v1/admin/element/123`,
      {
        imageUrl: "https://image.com/avatar2.png",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(elementResponse.statusCode).toBe(403);
    expect(mapResponse.statusCode).toBe(403);
    expect(avatarResponse.statusCode).toBe(403);
    expect(updateElementResponse.statusCode).toBe(403);
  });

  test("Admin is able to hit admin endpoints", async () => {
    const elementResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const mapResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        defaultElements: [],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const avatarResponse = await axios.post(
      `${BACKEND_URL}/v1/admin/avatar`,
      {
        imageUrl: "https://image.com/avatar1.png",
        name: "Timmy",
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    expect(elementResponse.statusCode).toBe(200);
    expect(mapResponse.statusCode).toBe(200);
    expect(avatarResponse.statusCode).toBe(200);
  });

  test("Admin is able to update the imageUrl for a element", async () => {
    const elementResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        static: true,
        height: 1,
        width: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const updateElementResponse = await axios.put(
      `${BACKEND_URL}/api/v1/admin/element/${elementResponse.data.id}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    expect(updateElementResponse.statusCode).toBe(200);
  });
});

// describe("Websocket tests", () => {
//   let adminToken;
//   let adminUserId;
//   let userToken;
//   let userId;
//   let element1Id;
//   let element2Id;
//   let spaceId;
//   let mapId;
//   let ws1;
//   let ws2;
//   let ws1Messages = [];
//   let ws2Messages = [];
//   let userX;
//   let userY;
//   let adminX;
//   let adminY;

//   async function waitForAndPopLatestMessage(messageArray) {
//     return new Promise((r) => {
//       if (messageArray.length > 0) {
//         resolve(messageArray.shift());
//       } else {
//         let interval = setInterval(() => {
//           if (messageArray.length > 0) {
//             resolve(messageArray.shift());
//             clearInterval(interval);
//           }
//         }, 100);
//       }
//     });
//   }

//   async function setupHTTP() {
//     const username = `Senpai-${Math.random()}`;
//     const password = "123456";
//     const adminSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username: username,
//       password,
//       role: "admin",
//     });

//     const adminSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//       username: username,
//       password,
//     });

//     adminUserId = adminSignupResponse.data.userId;
//     adminToken = adminSigninResponse.data.token;

//     const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       role: "user",
//     });

//     const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//       username: username + "-user",
//       password,
//     });

//     userId = userSignupResponse.data.userId;
//     userToken = userSigninResponse.data.token;

//     const element1Response = await axios.post(
//       `${BACKEND_URL}/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         static: false,
//         height: 1,
//         width: 1,
//       },
//       {
//         Authorization: `Bearer ${adminToken}`,
//       }
//     );

//     const element2Response = await axios.post(
//       `${BACKEND_URL}/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         static: false,
//         height: 1,
//         width: 1,
//       },
//       {
//         Authorization: `Bearer ${adminToken}`,
//       }
//     );

//     element1Id = element1Response.data.id;
//     element2Id = element2Response.data.id;

//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );

//     mapId = mapResponse.id;

//     const spaceResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/`,
//       {
//         name: "test",
//         dimensions: "100x200",
//         mapId: mapId,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );

//     spaceId = spaceResponse.data.spaceId;
//   }

//   async function setupWs() {
//     ws1 = new WebSocket(WS_URL);

//     await new Promise((r) => {
//       ws1.onopen = r;
//     });

//     ws1.onmessage = (event) => {
//       ws1Messages.push(JSON.parse(event.data));
//     };

//     ws2 = new WebSocket(WS_URL);

//     await new Promise((r) => {
//       ws2.onopen = r;
//     });

//     ws2.onmessage = (event) => {
//       ws2Messages.push(JSON.parse(event.data));
//     };
//   }

//   beforeAll(async () => {
//     setupHTTP();
//     setupWs();
//   });

//   test("Get back ack for joining the space", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "join",
//         payload: {
//           spaceId: spaceId,
//           token: adminToken,
//         },
//       })
//     );

//     const message1 = await waitForAndPopLatestMessage(ws1Messages);

//     ws2.send(
//       JSON.stringify({
//         type: "join",
//         payload: {
//           spaceId: spaceId,
//           token: userToken,
//         },
//       })
//     );

//     const message2 = await waitForAndPopLatestMessage(ws2Messages);
//     const message3 = await waitForAndPopLatestMessage(ws1Messages);

//     expect(message1.type).toBe("space-joined");
//     expect(message2.type).toBe("space-joined");

//     expect(message1.payload.users.length).toBe(0);
//     expect(message2.payload.users.length).toBe(1);
//     expect(message3.type).toBe("space-join");

//     expect(message3.payload.x).toBe(message2.payload.spawn.x);
//     expect(message3.payload.y).toBe(message2.payload.spawn.y);
//     expect(message3.payload.userId).toBe(userId);

//     expect(message1.payload.users.length + message2.payload.users.length).toBe(
//       1
//     );

//     adminX = messages1.payload.spawn.x;
//     adminY = messages2.payload.spawn.y;

//     userX = messages2.payload.spawn.x;
//     userY = messages2.payload.spawn.y;
//   });

//   test("user should not be able to move across the boundary of the wall", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "movement",
//         payload: {
//           x: 100000,
//           y: 100000,
//         },
//       })
//     );

//     const message = await waitForAndPopLatestMessage(ws1Messages);
//     expect(message.type).toBe("movement-rejected");
//     expect(message.payload.x).toBe(adminX);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("user should not be able to move 2 blocks at the same time", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "movement",
//         payload: {
//           x: adminX + 2,
//           y: adminY,
//         },
//       })
//     );

//     const message = await waitForAndPopLatestMessage(ws1Messages);
//     expect(message.type).toBe("movement-rejected");
//     expect(message.payload.x).toBe(adminX);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("Correct movement should be broadcasted to all the users in the room", async () => {
//     ws1.send({
//       type: "movement",
//       payload: {
//         x: adminX + 1,
//         y: adminY,
//         userId: adminId,
//       },
//     });

//     const message = await waitForAndPopLatestMessage(ws2Messages);
//     expect(message.type).toBe("movement");
//     expect(message.payload.x).toBe(adminX + 1);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("if a user leaves, the other user recives an event", async () => {
//     ws1.close();

//     const message = await waitForAndPopLatestMessage(ws2Messages);
//     expect(message.type).toBe("user-left");
//     expect(message.payload.userId).toBe(adminId);
//   });
// });
