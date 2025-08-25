# Security Policy

## Supported Versions

| Version | Supported          |
|---------|------------------|
| main    | :white_check_mark: |
| <older versions> | :x: |

We actively maintain the `main` branch and provide security fixes for it. Older versions are no longer supported.

---

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please follow these steps:

1. **Do NOT open a public issue**.  
2. Send an email to: **ayso.devops@gmail.com**.  
3. Include:
   - A clear description of the vulnerability
   - Steps to reproduce the issue
   - A suggested fix (if possible)
   - Environment details (Next.js version, Node.js version, etc.)

We aim to respond within **48 hours**.

---

## Security Best Practices

For users integrating this SaaS analytics tool:

- Always run the latest version to benefit from security patches.
- Use **HTTPS** when deploying to production.
- Ensure your database credentials are **never exposed** publicly.
- Regularly review dependencies with tools like [npm audit](https://docs.npmjs.com/cli/v9/commands/npm-audit) or [Snyk](https://snyk.io/).
- Limit access to your analytics dashboard with proper authentication.

---

## Acknowledgements

We appreciate security researchers who responsibly disclose vulnerabilities and help us keep this project safe.
