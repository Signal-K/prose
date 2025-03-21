"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import type { UserSubscriptionPlan } from "@/types/index";

import type { SubscriptionPlan } from "@/types/index"
import { pricingData } from "@/config/subscriptions"
import { cn } from "@/lib/utils"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { BillingFormButton } from "@/components/forms/billing-form-button"
import { ModalContext } from "@/components/modals/providers"
import { HeaderSection } from "@/components/shared/header-section"
import { Icons } from "@/components/shared/icons"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

interface PricingCardsProps {
  userId?: string
  subscriptionPlan?: UserSubscriptionPlan
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault = !subscriptionPlan?.stripeCustomerId || subscriptionPlan.interval === "year" ? true : false
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault)
  const { setShowSignInModal } = useContext(ModalContext)

  const toggleBilling = () => {
    setIsYearly(!isYearly)
  }

  // Neobrutalist color palette
  const cardColors = {
    starter: {
      bg: "bg-yellow-300",
      border: "border-black",
      shadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      buttonBg: "bg-white hover:bg-yellow-100",
      buttonText: "text-black",
      buttonBorder: "border-black",
      buttonShadow: "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
    pro: {
      bg: "bg-purple-400",
      border: "border-black",
      shadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      buttonBg: "bg-black hover:bg-gray-800",
      buttonText: "text-white",
      buttonBorder: "border-black",
      buttonShadow: "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
    enterprise: {
      bg: "bg-cyan-300",
      border: "border-black",
      shadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      buttonBg: "bg-white hover:bg-cyan-100",
      buttonText: "text-black",
      buttonBorder: "border-black",
      buttonShadow: "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
  }

  const PricingCard = ({ offer }: { offer: SubscriptionPlan }) => {
    const planKey = offer.title.toLowerCase() as keyof typeof cardColors
    const colors = cardColors[planKey]

    return (
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-none border-2 transition-transform hover:-translate-y-1",
          colors.bg,
          colors.border,
          colors.shadow,
          "transform rotate-0 hover:rotate-1",
          offer.title.toLowerCase() === "pro" ? "border-[3px]" : "border-[2px]",
        )}
        key={offer.title}
      >
        {offer.title.toLowerCase() === "pro" && (
          <div className="absolute -right-12 top-6 rotate-45 bg-black px-12 py-1 text-sm font-bold text-white">
            POPULAR
          </div>
        )}

        <div className="min-h-[150px] items-start space-y-4 p-6 border-b-2 border-black">
          <p className="flex font-mono text-lg font-black uppercase tracking-wider text-black">{offer.title}</p>

          <div className="flex flex-row">
            <div className="flex items-end">
              <div className="flex text-left text-4xl font-black leading-6 font-mono">
                {isYearly && offer.prices.monthly > 0 ? (
                  <>
                    <span className="mr-2 text-gray-600 line-through">${offer.prices.monthly}</span>
                    <span>${offer.prices.yearly / 12}</span>
                  </>
                ) : (
                  `$${offer.prices.monthly}`
                )}
              </div>
              <div className="-mb-1 ml-2 text-left text-sm font-bold text-black">
                <div>/month</div>
              </div>
            </div>
          </div>
          {offer.prices.monthly > 0 ? (
            <div className="text-left text-sm font-medium text-black">
              {isYearly ? `$${offer.prices.yearly} will be charged when annual` : "when charged monthly"}
            </div>
          ) : null}
        </div>

        <div className="flex h-full flex-col justify-between gap-8 p-6">
          <ul className="space-y-3 text-left text-sm font-medium leading-normal">
            {offer.benefits.map((feature, index) => (
              <li className={cn("flex items-start gap-x-3", index % 2 === 0 ? "-rotate-1" : "rotate-1")} key={feature}>
                <Icons.check className="size-5 shrink-0 text-black" />
                <p className="font-medium">{feature}</p>
              </li>
            ))}

            {offer.limitations.length > 0 &&
              offer.limitations.map((feature) => (
                <li className="flex items-start text-gray-700" key={feature}>
                  <Icons.close className="mr-3 size-5 shrink-0" />
                  <p>{feature}</p>
                </li>
              ))}
          </ul>

          {userId && subscriptionPlan ? (
            offer.title === "Starter" ? (
              <Link
                href="/dashboard"
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-none border-2 px-6 py-3 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  colors.buttonBg,
                  colors.buttonText,
                  colors.buttonBorder,
                  colors.buttonShadow,
                  "w-full transform hover:-translate-y-1 hover:translate-x-1",
                )}
              >
                Go to dashboard
              </Link>
            ) : (
              <BillingFormButton year={isYearly} offer={offer} subscriptionPlan={subscriptionPlan} />
            )
          ) : (
            <button
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-none border-2 px-6 py-3 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                colors.buttonBg,
                colors.buttonText,
                colors.buttonBorder,
                colors.buttonShadow,
                "w-full transform hover:-translate-y-1 hover:translate-x-1",
              )}
              onClick={() => setShowSignInModal(true)}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center text-center">
        <HeaderSection label="Pricing" title="Start at full speed !" />

        <div className="mb-8 mt-10 flex items-center gap-5">
          <div className="relative">
            <ToggleGroup
              type="single"
              size="sm"
              defaultValue={isYearly ? "yearly" : "monthly"}
              onValueChange={toggleBilling}
              aria-label="toggle-year"
              className="h-12 overflow-hidden rounded-none border-2 border-black bg-white p-1 *:h-10 *:text-black *:font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <ToggleGroupItem
                value="yearly"
                className="rounded-none px-5 data-[state=on]:!bg-green-300 data-[state=on]:!text-black"
                aria-label="Toggle yearly billing"
              >
                Yearly (-20%)
              </ToggleGroupItem>
              <ToggleGroupItem
                value="monthly"
                className="rounded-none px-5 data-[state=on]:!bg-green-300 data-[state=on]:!text-black"
                aria-label="Toggle monthly billing"
              >
                Monthly
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="grid gap-8 bg-inherit py-5 lg:grid-cols-3">
          {pricingData.map((offer) => (
            <PricingCard offer={offer} key={offer.title} />
          ))}
        </div>

        <p className="mt-8 text-balance text-center text-base font-medium">
          Email{" "}
          <a className="font-bold text-purple-500 hover:underline" href="mailto:support@saas-starter.com">
            support@saas-starter.com
          </a>{" "}
          to contact our support team.
          <br />
          <strong className="bg-yellow-300 px-2 py-1 border-2 border-black inline-block mt-2 rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            You can test the subscriptions and won&apos;t be charged.
          </strong>
        </p>
      </section>
    </MaxWidthWrapper>
  );
};