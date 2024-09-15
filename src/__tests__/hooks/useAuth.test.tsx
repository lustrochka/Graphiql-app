import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import useAuth from "../../hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

describe("useAuth", () => {
  it("should update user state correctly", async () => {
    const mockUser = { uid: "123", email: "test@example.com" };
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      setTimeout(() => callback(mockUser), 0);
      return jest.fn();
    });

    onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBe(null);

    await waitFor(() => expect(result.current.user).toEqual(mockUser));
  });
});
