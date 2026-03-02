import { envVars } from "../app/config/env";
import { prisma } from "../app/lib/prisma";
import { Role } from "../generated/prisma/enums";


async function seedAdmin() {
  try {
    const adminData = {
      name: envVars.ADMIN_NAME as string,
      email: envVars.ADMIN_EMAIL as string,
      password: envVars.ADMIN_PASSWORD as string,
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      console.log("Admin already exists!");
      return;
    }

    // Sign up via auth API
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Only add Origin if APP_URL is defined
    if (envVars.APP_URL) {
      headers["Origin"] = envVars.APP_URL;
    }

    const response = await fetch(
      `${envVars.BETTER_AUTH_URL}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(adminData),
      },
    );

    const text = await response.text();
    let result: any;
    try {
      result = JSON.parse(text);
    } catch {
      console.error("Response was not JSON:", text);
      return;
    }

    console.log("Sign-up result:", result);

    if (!response.ok) {
      console.error("Failed to create admin via auth API");
      return;
    }

    // Promote user to ADMIN
    await prisma.user.update({
      where: { email: adminData.email },
      data: {
        role: Role.ADMIN,
        emailVerified: true,
      },
    });

    console.log("Admin promoted successfully!");
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1); 
  }
}

// Run the seed
seedAdmin();
