"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TypeTester() {
  const [text, setText] = useState("The Quick Brown Fox Jumps Over The Lazy Dog");
  const [fontSize, setFontSize] = useState([48]);

  return (
    <Card className="bg-[#1a2b4d] border-white/10 p-6">
      <h2 className="text-white font-semibold mb-4">Type Tester</h2>

      <div className="space-y-4">
        {/* Preview */}
        <div className="bg-[#0f1724] p-8 rounded-lg min-h-[200px] flex items-center justify-center">
          <p
            className="text-white text-center break-words max-w-full"
            style={{ fontSize: `${fontSize[0]}px` }}
          >
            {text}
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white/70 text-sm mb-2 block">Font Size: {fontSize[0]}px</label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={12}
              max={120}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Font Style</label>
            <Select defaultValue="regular">
              <SelectTrigger className="bg-[#0f1724] border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="italic">Italic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-white/70 text-sm mb-2 block">Custom Text</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your custom text here..."
            className="bg-[#0f1724] border-white/10 text-white placeholder:text-white/40 min-h-[80px]"
          />
        </div>
      </div>
    </Card>
  );
}
