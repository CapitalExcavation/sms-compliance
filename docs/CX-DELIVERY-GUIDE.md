# Capital Excavation delivery contract

This guide defines the minimum delivery and support contract for every Capital
Excavation repository. It applies to people and coding agents. Project-specific
instructions may add constraints; they may not remove or weaken this contract.

The human procedure is available at
[apps.capitalexcavation.com/learn](https://apps.capitalexcavation.com/learn).

## Start with the request

1. Read the issue, repository README, and `docs/PROJECT-INSTRUCTIONS.md`.
2. Identify the requested outcome and the files or systems placed in scope.
3. Inspect before editing. Preserve existing work and unrelated changes.
4. Ask for a decision only when the missing choice materially changes the result.
5. Never invent a hostname, route, API path, scope, credential name, environment,
   or production behavior. Find the repository's documented value or report it missing.

## Delivery assessment

Every production or access change must account for these six areas:

1. **Run and test** — Reproduce the local setup, identify the build artifact,
   run automated checks, and establish a health signal.
2. **Data and state** — Locate files and databases, define backup needs, and
   decide whether the application may scale beyond one instance.
3. **Identity and access** — Define who can reach the application, whether
   access is interactive or unattended, and where authorization belongs.
4. **Dependencies** — Inventory vendor APIs, scheduled jobs, inbound webhooks,
   email or SMS, private networking, and DNS requirements.
5. **Secrets and risk** — Remove embedded credentials, use approved Azure
   identity or secret storage, and identify sensitive logs and data.
6. **Operations** — Set resource sizing, monitoring, recovery, rollback, cost
   boundaries, ownership, and the production support path.

## Change boundary

- Diagnose before changing. Reproduce the failure and identify the first broken
  boundary.
- When Ariat is repairing deployment or access, change only Ariat-owned contract
  artifacts. Do not change application paths, parsing, data rules, UI, or business
  behavior to mask an infrastructure failure.
- Change project code only when the project owner requests that code change, or
  when evidence shows an Ariat-introduced contract change requires a narrow,
  reviewed compatibility update.
- Do not broaden the task from one application to other applications, routes,
  credentials, users, or deployed environments without explicit authority.
- Use reviewable changes. Run checks appropriate to the risk and record the
  exact health signal before declaring success.

## Identity and private API access

These rules apply only when the project uses the managed private API path:

- Microsoft Entra ID authenticates the human. Private-access roles authorize
  private resources. Do not claim Entra group authorization unless a tested
  group-to-role policy is documented for this project.
- A browser message that says **Device Connected** completes sign-in only. The
  desktop client must also say **Connected** before the application can use a
  private hostname.
- Applications receive a private base URL, not a vendor credential. Never add
  a vendor client secret, bearer token, broker token, or authorization header to
  local code, configuration, logs, tests, screenshots, or issues.
- Do not call the vendor origin directly or substitute another project's route.
  Use only the base URL and read/write scope documented in the project contract.
- `ACCESS: PASS` means identity, private DNS, routing, gateway signing, broker
  authorization, and the test vendor read are healthy. A later path, parsing,
  pagination, data, or UI failure belongs to the project.
- Adding or removing a user is a role assignment plus client reconnect. It does
  not require a client, gateway, broker, or application redeployment.

## Deployment and operations

- Normal application changes use a feature branch, pull request, review, and
  merge to the default branch. Use GitHub Desktop when guiding project owners.
- A green merge is not proof of production health. Verify the deployment run and
  the production health signal for the exact commit.
- Infrastructure, Entra, private-access, broker, DNS, secret, and role changes
  remain reviewed operator work; they do not ride along with an application merge.
- Never commit secrets, local databases, exports, customer data, certificates,
  or production `.env` files. Never print protected values while troubleshooting.
- Preserve a known rollback target before a production change.

## Issues and handoff

When work is blocked or a test fails, open or update the repository issue with:

- the numbered step that failed;
- expected and actual behavior;
- the exact non-sensitive error and HTTP status;
- the tested identity, hostname, and route label when relevant;
- the time of the test and a screenshot when useful;
- checks already completed and the next owner.

Never include passwords, verification codes, keys, tokens, cookies,
authorization headers, or secret-bearing URLs.

## Completion

Work is complete only when the requested outcome is present, relevant checks
pass, the health signal is recorded, documentation matches the implemented
contract, and no unrelated project behavior changed.

This file is organization-governed. Request changes in
`CapitalExcavation/team-collab`; do not edit a repository copy directly.
