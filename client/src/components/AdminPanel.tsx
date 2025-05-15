import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVouchers } from "@/hooks/use-vouchers";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { X, BarChart2, Plus, Save, Trash2 } from "lucide-react";
import DashboardMetrics from "./DashboardMetrics";

interface AdminPanelProps {
  onClose: () => void;
  gameTypes: string[];
  activeGame: string;
}

export default function AdminPanel({ onClose, gameTypes, activeGame }: AdminPanelProps) {
  const [selectedGame, setSelectedGame] = useState(activeGame);
  const [selectedVoucherId, setSelectedVoucherId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [bonus, setBonus] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("edit");
  const [currency, setCurrency] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { vouchers, isLoading, refetch } = useVouchers(selectedGame);
  const { toast } = useToast();

  // When game type changes, reset card selection
  useEffect(() => {
    setSelectedVoucherId("");
    setAmount("");
    setBonus("");
    setPrice("");
  }, [selectedGame]);

  // When card selection changes, populate fields
  useEffect(() => {
    if (selectedVoucherId && vouchers) {
      const selectedVoucher = vouchers.find(v => v.id.toString() === selectedVoucherId);
      if (selectedVoucher) {
        setAmount(selectedVoucher.amount.toString());
        setBonus(selectedVoucher.bonus.toString());
        setPrice(selectedVoucher.price ? selectedVoucher.price.toString() : "0");
      }
    }
  }, [selectedVoucherId, vouchers]);

  // Format game type for display
  const formatGameType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Format voucher label
  const formatVoucherLabel = (voucher: any): string => {
    const amountInK = (voucher.amount / 1000).toFixed(0);
    return `${amountInK}K ${voucher.currency} (${voucher.bonus} Bonus)`;
  };

  // Update existing voucher
  const handleSave = async () => {
    if (!selectedVoucherId || !amount || !bonus || !price) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all fields",
      });
      return;
    }

    try {
      await apiRequest("PUT", `/api/vouchers/${selectedVoucherId}`, {
        amount: Number(amount),
        bonus: Number(bonus),
        price: Number(price),
      });

      toast({
        title: "Success",
        description: "Voucher updated successfully",
      });

      // Invalidate and refetch queries to update UI
      queryClient.invalidateQueries({ queryKey: ["/api/vouchers"] });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating the voucher.",
      });
    }
  };
  
  // Create new voucher
  const handleCreate = async () => {
    // Get default currency based on game type
    const currencyByGame = {
      crossfire: "ZP",
      pubg: "UC",
      freefire: "Diamonds"
    };
    
    // Default image URL based on game type and amount
    const getDefaultImageUrl = () => {
      if (selectedGame === 'crossfire') {
        if (Number(amount) <= 5000) return "/attached_assets/images.jpg";
        if (Number(amount) <= 10000) return "/attached_assets/images(1).jpg";
        if (Number(amount) <= 50000) return "/attached_assets/images(2).jpg";
        return "/attached_assets/images(3).jpg";
      }
      
      if (selectedGame === 'pubg') {
        if (Number(amount) <= 5000) return "/attached_assets/images(4).jpg";
        if (Number(amount) <= 10000) return "/attached_assets/images(5).jpg";
        return "/attached_assets/images(6).jpg";
      }
      
      if (selectedGame === 'freefire') {
        if (Number(amount) <= 5000) return "/attached_assets/freefire1.png";
        if (Number(amount) <= 10000) return "/attached_assets/freefire2.png";
        return "/attached_assets/freefire1.png";
      }
      
      return "/attached_assets/FB_IMG_1747248207377.jpg";
    };
    
    if (!selectedGame || !amount || !bonus || !price) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    const newVoucher = {
      gameType: selectedGame,
      amount: Number(amount),
      bonus: Number(bonus),
      price: Number(price),
      currency: currency || currencyByGame[selectedGame as keyof typeof currencyByGame],
      imageUrl: imageUrl || getDefaultImageUrl(),
      description: description || `${selectedGame} card ${(Number(amount)/1000).toFixed(0)}k + ${bonus} ${currencyByGame[selectedGame as keyof typeof currencyByGame]} bonus`
    };
    
    try {
      const result = await apiRequest("POST", `/api/vouchers`, newVoucher);
      
      toast({
        title: "Success",
        description: "New voucher created successfully",
      });
      
      // Invalidate and refetch queries to update UI
      queryClient.invalidateQueries({ queryKey: ["/api/vouchers"] });
      refetch();
      
      // Reset form fields
      setAmount("");
      setBonus("");
      setPrice("");
      setCurrency("");
      setImageUrl("");
      setDescription("");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Creation Failed",
        description: "There was an error creating the voucher.",
      });
    }
  };
  
  // Delete voucher
  const handleDelete = async () => {
    if (!selectedVoucherId) {
      toast({
        variant: "destructive",
        title: "Selection Required",
        description: "Please select a voucher to delete",
      });
      return;
    }
    
    try {
      await apiRequest("DELETE", `/api/vouchers/${selectedVoucherId}`, {});
      
      toast({
        title: "Success",
        description: "Voucher deleted successfully",
      });
      
      // Invalidate and refetch queries to update UI
      queryClient.invalidateQueries({ queryKey: ["/api/vouchers"] });
      refetch();
      
      // Reset selection
      setSelectedVoucherId("");
      setAmount("");
      setBonus("");
      setPrice("");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: "There was an error deleting the voucher.",
      });
    }
  };

  return (
    <Card className="admin-panel bg-secondary mb-6 relative border border-purple-600 shadow-[0_0_15px_rgba(124,58,237,0.3)] neon-border">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 text-red-400 hover:text-red-300"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-orbitron font-semibold text-purple-400 neon-text flex items-center gap-2">
          <span className="bg-purple-500/20 p-1 rounded">🔒</span> Admin Panel
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-purple-300">
          <BarChart2 className="h-4 w-4" /> Performance Metrics & Management
        </CardDescription>
      </CardHeader>
      
      {/* Dashboard Metrics Section */}
      <div className="px-6 py-2 mb-6">
        <DashboardMetrics vouchers={vouchers || []} />
      </div>
      
      <CardContent>
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-1">Game Selection</Label>
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded">
              <SelectValue placeholder="Select game" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {gameTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {formatGameType(type)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="edit" className="w-full" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="edit" className="data-[state=active]:bg-purple-800">Edit Vouchers</TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-green-800">Create New</TabsTrigger>
            <TabsTrigger value="delete" className="data-[state=active]:bg-red-800">Delete</TabsTrigger>
          </TabsList>

          {/* Edit Tab */}
          <TabsContent value="edit" className="border border-purple-900/50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-1">Card Selection</Label>
                <Select 
                  value={selectedVoucherId} 
                  onValueChange={setSelectedVoucherId}
                  disabled={isLoading || !vouchers || vouchers.length === 0}
                >
                  <SelectTrigger className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded">
                    <SelectValue placeholder="Select card" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {vouchers && vouchers.map((voucher) => (
                        <SelectItem key={voucher.id} value={voucher.id.toString()}>
                          {formatVoucherLabel(voucher)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">
                  Amount ({selectedGame === 'crossfire' ? 'ZP' : 
                        selectedGame === 'pubg' ? 'UC' : 'Diamonds'})
                </Label>
                <Input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="5000"
                  disabled={!selectedVoucherId}
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">Bonus</Label>
                <Input 
                  type="number" 
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="120"
                  disabled={!selectedVoucherId}
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <span className="flex items-center gap-1">
                    Sale Price <span className="text-green-500">(ج.م)</span>
                  </span>
                </Label>
                <Input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="75"
                  disabled={!selectedVoucherId}
                />
              </div>
              
              <div className="md:col-span-2">
                <Label className="block text-sm font-medium mb-1">Generated Description</Label>
                <Input 
                  type="text" 
                  readOnly
                  value={`${selectedGame} card ${amount ? (Number(amount)/1000).toFixed(0) : '0'}k + ${bonus || '0'} ${selectedGame === 'crossfire' ? 'zp' : selectedGame === 'pubg' ? 'UC' : 'Diamonds'} bonus`}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white font-mono text-sm" 
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                className="gaming-btn bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                onClick={handleSave}
                disabled={!selectedVoucherId || !amount || !bonus || !price}
              >
                <Save size={16} /> Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Create Tab */}
          <TabsContent value="create" className="border border-green-900/50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-1">
                  Amount ({selectedGame === 'crossfire' ? 'ZP' : 
                        selectedGame === 'pubg' ? 'UC' : 'Diamonds'})
                </Label>
                <Input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="5000"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">Bonus</Label>
                <Input 
                  type="number" 
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="120"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <span className="flex items-center gap-1">
                    Sale Price <span className="text-green-500">(ج.م)</span>
                  </span>
                </Label>
                <Input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="75"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">Currency (Optional)</Label>
                <Input 
                  type="text" 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder={selectedGame === 'crossfire' ? 'ZP' : selectedGame === 'pubg' ? 'UC' : 'Diamonds'}
                />
              </div>
              
              <div className="md:col-span-2">
                <Label className="block text-sm font-medium mb-1">Generated Description</Label>
                <Input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`${selectedGame} card ${amount ? (Number(amount)/1000).toFixed(0) : '0'}k + ${bonus || '0'} ${selectedGame === 'crossfire' ? 'zp' : selectedGame === 'pubg' ? 'UC' : 'Diamonds'} bonus`}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white font-mono text-sm" 
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                className="gaming-btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={handleCreate}
                disabled={!selectedGame || !amount || !bonus || !price}
              >
                <Plus size={16} /> Create Voucher
              </Button>
            </div>
          </TabsContent>

          {/* Delete Tab */}
          <TabsContent value="delete" className="border border-red-900/50 p-4 rounded-md">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-1">Select Voucher to Delete</Label>
                <Select 
                  value={selectedVoucherId} 
                  onValueChange={setSelectedVoucherId}
                  disabled={isLoading || !vouchers || vouchers.length === 0}
                >
                  <SelectTrigger className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded">
                    <SelectValue placeholder="Select card to delete" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {vouchers && vouchers.map((voucher) => (
                        <SelectItem key={voucher.id} value={voucher.id.toString()}>
                          {formatVoucherLabel(voucher)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedVoucherId && (
                <div className="bg-red-900/20 p-4 rounded-md border border-red-500/50">
                  <p className="text-red-300 mb-2 font-semibold">⚠️ Warning: This action cannot be undone</p>
                  <p className="text-gray-300 mb-4">
                    You are about to delete the selected voucher permanently. Please confirm this action.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                className="gaming-btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                onClick={handleDelete}
                disabled={!selectedVoucherId}
              >
                <Trash2 size={16} /> Delete Voucher
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
