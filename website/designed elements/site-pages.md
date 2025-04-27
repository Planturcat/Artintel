# Site Pages

## Main Pages
1. Home Page (`/` - src/app/page.tsx)
2. Dashboard (`/dashboard` - src/app/dashboard/page.tsx)

## Authentication Pages
1. Sign In (`/signin` - src/app/(auth)/signin/page.tsx)
2. Sign Up (`/signup` - src/app/(auth)/signup/page.tsx)
3. Register (`/register`) - Not implemented yet, might be redundant with Sign Up
4. Forgot Password (`/forgot-password` - src/app/(auth)/forgot-password/page.tsx)
5. Reset Password (`/reset-password` - src/app/(auth)/reset-password/page.tsx)
6. Verify Email (`/verify-email` - src/app/(auth)/verify-email/page.tsx)

## Marketing Pages
1. About (`/about` - src/app/(marketing)/about/page.tsx)
2. Features (`/features` - src/app/(marketing)/features/page.tsx)
3. Pricing (`/pricing` - src/app/(marketing)/pricing/page.tsx)
4. How It Works (`/how-it-works` - src/app/(marketing)/how-it-works/page.tsx)
5. Community (`/community` - src/app/(marketing)/community/page.tsx)
6. Use Cases (`/use-cases` - src/app/(marketing)/use-cases/page.tsx)
7. Blog (`/blog` - src/app/(marketing)/blog/page.tsx)
   - Blog Post: Evolution of Language Models (`/blog/evolution-of-language-models` - src/app/(marketing)/blog/evolution-of-language-models/page.tsx)
   - Blog Post: Fine-Tuning Mistral 7B (`/blog/fine-tuning-mistral-7b` - src/app/(marketing)/blog/fine-tuning-mistral-7b/page.tsx)
   - Blog Post: Business Case for Open-Source LLMs (`/blog/business-case-open-source-llm` - src/app/(marketing)/blog/business-case-open-source-llm/page.tsx)
   - Other blog posts referenced in UI but not yet implemented:
     * FinTech Cost Reduction with SLMs (`/blog/fintech-cost-reduction-slm`)
     * Prompt Engineering Guide (`/blog/prompt-engineering-guide`)
     * New Fine-Tuning Studio (`/blog/new-fine-tuning-studio`)
     * Optimizing LLM Inference (`/blog/optimizing-llm-inference`)
8. Contact (`/contact` - src/app/(marketing)/contact/page.tsx)

## Documentation & Resources
1. Documentation (`/docs` - src/app/(marketing)/docs/page.tsx)
2. Models Overview (`/models` - src/app/(marketing)/models/page.tsx)
3. SLM Models (`/slm-models` - src/app/(marketing)/slm-models/page.tsx)
4. LLM Models (`/llm-models` - src/app/(marketing)/llm-models/page.tsx)
5. Models Comparison (`/models/comparison` - src/app/(marketing)/models/comparison/page.tsx)
6. Catalog (`/catalog` - src/app/(marketing)/catalog/page.tsx)

## Resources Pages (Referenced in Navigation)
1. Resources Overview (`/resources` - src/app/(marketing)/resources/page.tsx)
2. Documentation (`/resources/docs` - src/app/(marketing)/resources/docs/page.tsx) - Redirects to `/docs`
3. Tutorials (`/resources/tutorials` - src/app/(marketing)/resources/tutorials/page.tsx)
4. Case Studies (`/resources/case-studies` - src/app/(marketing)/resources/case-studies/page.tsx)

## Models Pages (Referenced in Navigation)
1. All Models (`/models/catalog` - src/app/(marketing)/models/catalog/page.tsx) - Redirects to `/catalog`
2. SLM Models (`/models/slm` - src/app/(marketing)/models/slm/page.tsx)
3. LLM Models (`/models/llm` - src/app/(marketing)/models/llm/page.tsx) - Redirects to `/llm-models`
4. Performance (`/models/performance` - src/app/(marketing)/models/performance/page.tsx)

## Legal Pages
1. Terms of Service (`/legal/terms` - src/app/(marketing)/legal/terms/page.tsx)
2. Privacy Policy (`/legal/privacy-policy` - src/app/(marketing)/legal/privacy-policy/page.tsx and `/privacy` - src/app/(marketing)/privacy/page.tsx)
3. Security (`/legal/security` - src/app/(marketing)/legal/security/page.tsx)
4. GDPR (`/legal/gdpr` - src/app/(marketing)/legal/gdpr/page.tsx)
5. Cookie Policy (`/legal/cookie` - src/app/(marketing)/legal/cookie/page.tsx)

## Special Pages
1. Status (`/status` - src/app/(marketing)/status/page.tsx)
2. Error Page (`/error` - src/app/(marketing)/error/page.tsx)
3. Not Found (404) Page (`/404` - src/app/not-found.tsx)

## Note
Some pages mentioned in the navigation or referenced in links may not be implemented yet. This document tracks both implemented pages and planned pages that are referenced in the codebase.