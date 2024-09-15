import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import useAuth from "../../hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("useAuth", () => {
  it("should update user state correctly", async () => {
    const mockUser = { uid: "123", email: "test@example.com" };
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      setTimeout(() => callback(mockUser), 0);
      return jest.fn();
    });

    onAuthStateChanged.mockImplementation(mockOnAuthStateChanged);

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/test",
      push: mockPush,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBe(null);

    await waitFor(() => expect(result.current.user).toEqual(mockUser));
  });
});
