import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface AgeVerificationModalProps {
  onConfirm: () => void;
  onDeny: () => void;
}

export default function AgeVerificationModal({ onConfirm, onDeny }: AgeVerificationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border border-gray-800 max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-6">
            <AlertTriangle className="h-10 w-10 text-yellow-500 mb-2" />
            <h2 className="text-2xl font-bold font-poppins text-white mb-2">Age Verification</h2>
            <p className="text-center text-gray-300 text-sm">
              This website contains products with nicotine. Nicotine is an addictive chemical.
            </p>
            <div className="mt-4 border-t border-gray-800 pt-4 w-full">
              <p className="text-white font-medium mb-4 text-center">Are you 21 or older?</p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={onConfirm}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8"
                >
                  YES
                </Button>
                <Button 
                  onClick={onDeny}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-8"
                >
                  NO
                </Button>
              </div>
              <p className="mt-4 text-xs text-gray-400 text-center">
                By entering this site, you agree to our <a href="#" className="text-emerald-500 hover:underline">Terms of Use</a> and <a href="#" className="text-emerald-500 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
