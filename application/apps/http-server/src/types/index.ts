import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(3, {
    message: "username must be atleast 3 characters long",
  }),
  email: z.string().email({
    message: "Please provide a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 characters long",
  }),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export const updateMetaData = z.object({
  avatarId: z.string(),
});

export const CreateSpaceSchema = z.object({
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  mapId: z.string(),
});

export const AddElementSchema = z.object({
  spaceId: z.string(),
  elementId: z.string(),
  x: z.number(),
  y: z.number(),
});

export const CreateElementSchema = z.object({
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  static: z.boolean(),
});

export const DeleteElementSchema = z.object({
  id: z.string(),
});

export const UpdateElementSchema = z.object({
  imageUrl: z.string(),
});

export const CreateAvatarSchema = z.object({
  imageUrl: z.string(),
  name: z.string(),
});

export const CreateMapSchema = z.object({
  thumbnail: z.string(),
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    })
  ),
});
