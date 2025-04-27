"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ModelComparison() {
  const [comparisonType, setComparisonType] = useState<
    "performance" | "features" | "cost"
  >("performance");

  return (
    <div className="p-6 font-mono" data-oid="wtolu7l">
      <div className="flex items-center gap-4 mb-6" data-oid="pipiaxn">
        <div className="text-[#00cddd]" data-oid="hlmi01-">
          &gt; compare models --type=
        </div>
        <div className="flex gap-2" data-oid="8r7p343">
          <Button
            size="sm"
            variant={comparisonType === "performance" ? "default" : "outline"}
            className={
              comparisonType === "performance" ? "bg-[#00cddd] text-black" : ""
            }
            onClick={() => setComparisonType("performance")}
            data-oid="zj3ypc:"
          >
            performance
          </Button>
          <Button
            size="sm"
            variant={comparisonType === "features" ? "default" : "outline"}
            className={
              comparisonType === "features" ? "bg-[#00cddd] text-black" : ""
            }
            onClick={() => setComparisonType("features")}
            data-oid=":ll88na"
          >
            features
          </Button>
          <Button
            size="sm"
            variant={comparisonType === "cost" ? "default" : "outline"}
            className={
              comparisonType === "cost" ? "bg-[#00cddd] text-black" : ""
            }
            onClick={() => setComparisonType("cost")}
            data-oid="0frd0bm"
          >
            cost
          </Button>
        </div>
      </div>

      {comparisonType === "performance" && (
        <div className="overflow-x-auto" data-oid="jar6950">
          <table className="w-full text-sm" data-oid="pmn9po1">
            <thead data-oid="im:h94-">
              <tr className="border-b border-border/40" data-oid="r8bmlc5">
                <th className="py-2 px-4 text-left" data-oid="-alhtbb">
                  Model
                </th>
                <th className="py-2 px-4 text-center" data-oid="6ikcyd_">
                  MMLU
                </th>
                <th className="py-2 px-4 text-center" data-oid="162-blg">
                  HumanEval
                </th>
                <th className="py-2 px-4 text-center" data-oid="7j9mpuv">
                  GSM8K
                </th>
                <th className="py-2 px-4 text-center" data-oid="11s12a-">
                  TruthfulQA
                </th>
                <th className="py-2 px-4 text-center" data-oid="bigwgpv">
                  Avg. Latency
                </th>
              </tr>
            </thead>
            <tbody data-oid="cw6tk94">
              <tr className="border-b border-border/40" data-oid="llus76m">
                <td className="py-2 px-4 font-medium" data-oid=".g6w.v0">
                  Phoenix-7B
                </td>
                <td className="py-2 px-4 text-center" data-oid="lfx24yt">
                  68.2%
                </td>
                <td className="py-2 px-4 text-center" data-oid="l:qm6ur">
                  42.5%
                </td>
                <td className="py-2 px-4 text-center" data-oid="07gybaw">
                  57.3%
                </td>
                <td className="py-2 px-4 text-center" data-oid="ug4v7.d">
                  61.8%
                </td>
                <td className="py-2 px-4 text-center" data-oid="pu0i4_4">
                  320ms
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="o-skrdd">
                <td className="py-2 px-4 font-medium" data-oid="9cvub56">
                  Phoenix-20B
                </td>
                <td className="py-2 px-4 text-center" data-oid="p8:zuqd">
                  75.6%
                </td>
                <td className="py-2 px-4 text-center" data-oid="cxky-hd">
                  51.2%
                </td>
                <td className="py-2 px-4 text-center" data-oid="rghesia">
                  68.9%
                </td>
                <td className="py-2 px-4 text-center" data-oid="n-vowpa">
                  72.3%
                </td>
                <td className="py-2 px-4 text-center" data-oid="yn_sn6h">
                  580ms
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="yj3saq:">
                <td className="py-2 px-4 font-medium" data-oid="1.-a_cr">
                  Codex-12B
                </td>
                <td className="py-2 px-4 text-center" data-oid="t2a:8j7">
                  62.1%
                </td>
                <td className="py-2 px-4 text-center" data-oid=":pwn4gd">
                  78.4%
                </td>
                <td className="py-2 px-4 text-center" data-oid=":qpjyzd">
                  71.2%
                </td>
                <td className="py-2 px-4 text-center" data-oid="jbyd:xj">
                  58.7%
                </td>
                <td className="py-2 px-4 text-center" data-oid="3vwtgnw">
                  450ms
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="4mtdw5z">
                <td className="py-2 px-4 font-medium" data-oid="cw7czsx">
                  Phoenix-30B
                </td>
                <td className="py-2 px-4 text-center" data-oid="40kfhux">
                  82.3%
                </td>
                <td className="py-2 px-4 text-center" data-oid="s0-.cia">
                  63.7%
                </td>
                <td className="py-2 px-4 text-center" data-oid="bn5whl_">
                  76.5%
                </td>
                <td className="py-2 px-4 text-center" data-oid="6bvc1e5">
                  78.9%
                </td>
                <td className="py-2 px-4 text-center" data-oid="nbukhcb">
                  820ms
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="2xt64_t">
                <td className="py-2 px-4 font-medium" data-oid="iv:dgr8">
                  Scholar-15B
                </td>
                <td className="py-2 px-4 text-center" data-oid="oh-g57y">
                  79.8%
                </td>
                <td className="py-2 px-4 text-center" data-oid="mx5kk7z">
                  48.3%
                </td>
                <td className="py-2 px-4 text-center" data-oid="cf8roki">
                  72.1%
                </td>
                <td className="py-2 px-4 text-center" data-oid="c8nes7u">
                  76.2%
                </td>
                <td className="py-2 px-4 text-center" data-oid="eg0458.">
                  510ms
                </td>
              </tr>
              <tr data-oid="xamyxb0">
                <td className="py-2 px-4 font-medium" data-oid="c40rvlv">
                  Multilingual-10B
                </td>
                <td className="py-2 px-4 text-center" data-oid="5ur1-cu">
                  71.4%
                </td>
                <td className="py-2 px-4 text-center" data-oid="s29kuab">
                  39.8%
                </td>
                <td className="py-2 px-4 text-center" data-oid="ni62:7m">
                  62.5%
                </td>
                <td className="py-2 px-4 text-center" data-oid="s70krqo">
                  67.3%
                </td>
                <td className="py-2 px-4 text-center" data-oid="o4wt4ph">
                  420ms
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {comparisonType === "features" && (
        <div className="overflow-x-auto" data-oid="bbyk-px">
          <table className="w-full text-sm" data-oid="de0jhy:">
            <thead data-oid="k8pqjad">
              <tr className="border-b border-border/40" data-oid=".c4owim">
                <th className="py-2 px-4 text-left" data-oid="6936uo8">
                  Model
                </th>
                <th className="py-2 px-4 text-center" data-oid="te-nktz">
                  Context Window
                </th>
                <th className="py-2 px-4 text-center" data-oid="oipj0kq">
                  Multilingual
                </th>
                <th className="py-2 px-4 text-center" data-oid="3gd05.k">
                  Code Generation
                </th>
                <th className="py-2 px-4 text-center" data-oid="f4659kl">
                  Fine-tuning
                </th>
                <th className="py-2 px-4 text-center" data-oid="1rnewqi">
                  Vision Support
                </th>
              </tr>
            </thead>
            <tbody data-oid="ecoa53c">
              <tr className="border-b border-border/40" data-oid="_.kxx9q">
                <td className="py-2 px-4 font-medium" data-oid="e_rrw5g">
                  Phoenix-7B
                </td>
                <td className="py-2 px-4 text-center" data-oid="63ivqqz">
                  8K
                </td>
                <td className="py-2 px-4 text-center" data-oid="u.wg0is">
                  Basic (10 languages)
                </td>
                <td className="py-2 px-4 text-center" data-oid="hidhesb">
                  Basic
                </td>
                <td className="py-2 px-4 text-center" data-oid="qj40gkp">
                  ✓
                </td>
                <td className="py-2 px-4 text-center" data-oid="zbfkvvs">
                  -
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="q28fpq2">
                <td className="py-2 px-4 font-medium" data-oid="qdn83hi">
                  Phoenix-20B
                </td>
                <td className="py-2 px-4 text-center" data-oid="hvk.20r">
                  16K
                </td>
                <td className="py-2 px-4 text-center" data-oid="2p.t0n-">
                  Good (20 languages)
                </td>
                <td className="py-2 px-4 text-center" data-oid="4tc7hb2">
                  Good
                </td>
                <td className="py-2 px-4 text-center" data-oid="rsunzh2">
                  ✓
                </td>
                <td className="py-2 px-4 text-center" data-oid="z7v_4gj">
                  Basic
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="zx30hb7">
                <td className="py-2 px-4 font-medium" data-oid="2dx2q1.">
                  Codex-12B
                </td>
                <td className="py-2 px-4 text-center" data-oid="i3vou6s">
                  12K
                </td>
                <td className="py-2 px-4 text-center" data-oid="9-5_-3o">
                  Limited (5 languages)
                </td>
                <td className="py-2 px-4 text-center" data-oid="_vpwbjs">
                  Excellent
                </td>
                <td className="py-2 px-4 text-center" data-oid="bxau-qp">
                  ✓
                </td>
                <td className="py-2 px-4 text-center" data-oid="v9og_n9">
                  -
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="7t8t8sr">
                <td className="py-2 px-4 font-medium" data-oid="1q6zp15">
                  Phoenix-30B
                </td>
                <td className="py-2 px-4 text-center" data-oid="42zt8iv">
                  32K
                </td>
                <td className="py-2 px-4 text-center" data-oid="w.sl3fi">
                  Excellent (30 languages)
                </td>
                <td className="py-2 px-4 text-center" data-oid="-1b5xtk">
                  Very Good
                </td>
                <td className="py-2 px-4 text-center" data-oid="40p6_jb">
                  ✓
                </td>
                <td className="py-2 px-4 text-center" data-oid="vox2s.1">
                  Advanced
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="v0ttzl2">
                <td className="py-2 px-4 font-medium" data-oid="wfs716t">
                  Scholar-15B
                </td>
                <td className="py-2 px-4 text-center" data-oid="9e:ofl1">
                  16K
                </td>
                <td className="py-2 px-4 text-center" data-oid="2pgyjeb">
                  Good (15 languages)
                </td>
                <td className="py-2 px-4 text-center" data-oid=".4ui68g">
                  Good
                </td>
                <td className="py-2 px-4 text-center" data-oid="wrb0mdg">
                  ✓
                </td>
                <td className="py-2 px-4 text-center" data-oid="rlt9fxb">
                  Basic
                </td>
              </tr>
              <tr data-oid="yml7-jg">
                <td className="py-2 px-4 font-medium" data-oid="yq26ji7">
                  Multilingual-10B
                </td>
                <td className="py-2 px-4 text-center" data-oid="fk87i70">
                  8K
                </td>
                <td className="py-2 px-4 text-center" data-oid=".v4iph5">
                  Excellent (40 languages)
                </td>
                <td className="py-2 px-4 text-center" data-oid="uyt3k0i">
                  Basic
                </td>
                <td className="py-2 px-4 text-center" data-oid="lssrncf">
                  ✓
                </td>
                <td className="py-2 px-4 text-center" data-oid="-91x14x">
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {comparisonType === "cost" && (
        <div className="overflow-x-auto" data-oid="e3444.o">
          <table className="w-full text-sm" data-oid="chyz9u5">
            <thead data-oid="ri.ha7u">
              <tr className="border-b border-border/40" data-oid="ufkdqv-">
                <th className="py-2 px-4 text-left" data-oid="g5hvr56">
                  Model
                </th>
                <th className="py-2 px-4 text-center" data-oid="xa-1zbe">
                  Input (per 1K tokens)
                </th>
                <th className="py-2 px-4 text-center" data-oid="1ydvq.:">
                  Output (per 1K tokens)
                </th>
                <th className="py-2 px-4 text-center" data-oid="3lnjfns">
                  Fine-tuning (per hour)
                </th>
                <th className="py-2 px-4 text-center" data-oid="gf.4lhf">
                  Dedicated Instance
                </th>
              </tr>
            </thead>
            <tbody data-oid="08fvfiv">
              <tr className="border-b border-border/40" data-oid="yaukz0m">
                <td className="py-2 px-4 font-medium" data-oid="mf26mb2">
                  Phoenix-7B
                </td>
                <td className="py-2 px-4 text-center" data-oid="2nem_43">
                  $0.0005
                </td>
                <td className="py-2 px-4 text-center" data-oid="cgfracx">
                  $0.0015
                </td>
                <td className="py-2 px-4 text-center" data-oid="vx2tanj">
                  $10
                </td>
                <td className="py-2 px-4 text-center" data-oid="02_hl2-">
                  $250/month
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="q40-a0i">
                <td className="py-2 px-4 font-medium" data-oid="tz24cx.">
                  Phoenix-20B
                </td>
                <td className="py-2 px-4 text-center" data-oid="cr3963n">
                  $0.0010
                </td>
                <td className="py-2 px-4 text-center" data-oid="cg29ii_">
                  $0.0030
                </td>
                <td className="py-2 px-4 text-center" data-oid="mp:9pio">
                  $25
                </td>
                <td className="py-2 px-4 text-center" data-oid="tb639bg">
                  $600/month
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="vb.ylo2">
                <td className="py-2 px-4 font-medium" data-oid="-g9daof">
                  Codex-12B
                </td>
                <td className="py-2 px-4 text-center" data-oid="qzx06wn">
                  $0.0008
                </td>
                <td className="py-2 px-4 text-center" data-oid="fykmgu.">
                  $0.0024
                </td>
                <td className="py-2 px-4 text-center" data-oid="t6fcy3g">
                  $18
                </td>
                <td className="py-2 px-4 text-center" data-oid="hl3:9lq">
                  $450/month
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="775rjth">
                <td className="py-2 px-4 font-medium" data-oid="y0-cwzq">
                  Phoenix-30B
                </td>
                <td className="py-2 px-4 text-center" data-oid="xwv6ckz">
                  $0.0015
                </td>
                <td className="py-2 px-4 text-center" data-oid=":ejtu4m">
                  $0.0045
                </td>
                <td className="py-2 px-4 text-center" data-oid="x8_1qdz">
                  $35
                </td>
                <td className="py-2 px-4 text-center" data-oid="0um5g2i">
                  $900/month
                </td>
              </tr>
              <tr className="border-b border-border/40" data-oid="dmqzd1_">
                <td className="py-2 px-4 font-medium" data-oid="hvuhlif">
                  Scholar-15B
                </td>
                <td className="py-2 px-4 text-center" data-oid="1q2h2p7">
                  $0.0009
                </td>
                <td className="py-2 px-4 text-center" data-oid="qojwv6l">
                  $0.0027
                </td>
                <td className="py-2 px-4 text-center" data-oid="o.2dz-_">
                  $20
                </td>
                <td className="py-2 px-4 text-center" data-oid=":ms9072">
                  $500/month
                </td>
              </tr>
              <tr data-oid="5twyjuj">
                <td className="py-2 px-4 font-medium" data-oid="u12mk_p">
                  Multilingual-10B
                </td>
                <td className="py-2 px-4 text-center" data-oid="eupnsmj">
                  $0.0007
                </td>
                <td className="py-2 px-4 text-center" data-oid="eddabvw">
                  $0.0021
                </td>
                <td className="py-2 px-4 text-center" data-oid="jl14npk">
                  $15
                </td>
                <td className="py-2 px-4 text-center" data-oid="aub87en">
                  $350/month
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-xs text-muted-foreground" data-oid="clq715t">
        Note: Performance metrics are based on standard benchmarks. Actual
        performance may vary depending on specific use cases and implementation
        details.
      </div>
    </div>
  );
}
