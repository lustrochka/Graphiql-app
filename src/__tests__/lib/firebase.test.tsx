import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
} from "../../lib/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

jest.mock("firebase/auth");
jest.mock("firebase/firestore");

describe("Firebase Authentication Tests", () => {
  const mockAuth = { currentUser: { uid: "test-uid" } };
  const mockSignInWithEmailAndPassword =
    signInWithEmailAndPassword as jest.Mock;
  const mockCreateUserWithEmailAndPassword =
    createUserWithEmailAndPassword as jest.Mock;
  const mockSignOut = signOut as jest.Mock;
  const mockAddDoc = addDoc as jest.Mock;
  const mockCollection = collection as jest.Mock;

  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockCollection.mockReturnValue({});
  });

  test("logInWithEmailAndPassword: should sign in user with email and password", async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: mockAuth.currentUser,
    });

    await logInWithEmailAndPassword("test@example.com", "password123");

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      "test@example.com",
      "password123",
    );
  });

  test("logInWithEmailAndPassword: should handle errors", async () => {
    const error = new Error("Invalid credentials");
    mockSignInWithEmailAndPassword.mockRejectedValue(error);

    await logInWithEmailAndPassword("test@example.com", "wrong-password");

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      "test@example.com",
      "wrong-password",
    );
    expect(global.alert).toHaveBeenCalledWith("Invalid credentials");
  });

  test("registerWithEmailAndPassword: should register user and add user data to Firestore", async () => {
    const mockUser = { user: { uid: "test-uid" } };
    mockCreateUserWithEmailAndPassword.mockResolvedValue(mockUser);
    mockAddDoc.mockResolvedValue({});

    await registerWithEmailAndPassword("test@example.com", "password123");

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      "test@example.com",
      "password123",
    );
    expect(mockAddDoc).toHaveBeenCalledWith(expect.anything(), {
      uid: "test-uid",
      authProvider: "local",
      email: "test@example.com",
    });
  });

  test("registerWithEmailAndPassword: should handle errors", async () => {
    const error = new Error("Registration failed");
    mockCreateUserWithEmailAndPassword.mockRejectedValue(error);

    await registerWithEmailAndPassword("test@example.com", "password123");

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      "test@example.com",
      "password123",
    );
    expect(global.alert).toHaveBeenCalledWith("Registration failed");
  });

  test("logout: should sign out user", async () => {
    await logout();

    expect(mockSignOut).toHaveBeenCalledWith(getAuth());
  });
});
