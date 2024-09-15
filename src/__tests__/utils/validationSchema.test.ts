import * as Yup from "yup";
import { validationSchema } from "../../utils/validationSchema.ts";

describe("validationSchema", () => {
  it("should validate a correct email and password", async () => {
    const validData = {
      email: "test@example.com",
      password: "Password123!",
    };

    await expect(validationSchema.validate(validData)).resolves.toBe(validData);
  });

  it("should invalidate an incorrect email", async () => {
    const invalidData = {
      email: "invalid-email",
      password: "Password123!",
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow(
      "Please enter a valid email address",
    );
  });

  it("should invalidate a short password", async () => {
    const invalidData = {
      email: "test@example.com",
      password: "short",
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow(
      "Password must be at least 8 characters",
    );
  });

  it("should invalidate a password without a letter", async () => {
    const invalidData = {
      email: "test@example.com",
      password: "12345678!",
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow(
      "Password must contain at least one letter",
    );
  });

  it("should invalidate a password without a digit", async () => {
    const invalidData = {
      email: "test@example.com",
      password: "Password!",
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow(
      "Password must contain at least one digit",
    );
  });

  it("should invalidate a password without a special character", async () => {
    const invalidData = {
      email: "test@example.com",
      password: "Password123",
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow(
      "Password must contain at least one special character",
    );
  });

  it("should invalidate a password with spaces", async () => {
    const invalidData = {
      email: "test@example.com",
      password: "Password 123!",
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow(
      "Password must not contain spaces",
    );
  });
});
