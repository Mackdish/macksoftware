import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  User, 
  FileText, 
  Plus, 
  LogOut, 
  Edit2, 
  Check, 
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface QuoteRequest {
  id: string;
  service_type: string;
  project_description: string;
  status: string;
  created_at: string;
  budget_range: string | null;
  timeline: string | null;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  "in-review": { label: "In Review", variant: "outline", icon: AlertCircle },
  contacted: { label: "Contacted", variant: "default", icon: CheckCircle2 },
  closed: { label: "Closed", variant: "destructive", icon: Check },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, isLoading: authLoading, signOut, refreshProfile } = useAuth();
  
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchQuotes();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setEditName(profile.full_name);
      setEditPhone(profile.phone || "");
    }
  }, [profile]);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: editName.trim(),
          phone: editPhone.trim() || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      await refreshProfile();
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  if (authLoading) {
    return (
      <PageLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="py-12 lg:py-20">
        <div className="container-wide">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                Welcome, {profile?.full_name?.split(" ")[0] || "there"}!
              </h1>
              <p className="text-muted-foreground">
                Manage your projects and profile from your dashboard.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/quote">
                <Button variant="cta">
                  <Plus className="w-4 h-4" />
                  New Project Request
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Profile
                  </h2>
                  {!isEditing ? (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setIsEditing(false);
                        setEditName(profile?.full_name || "");
                        setEditPhone(profile?.phone || "");
                      }}>
                        <X className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    {isEditing ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium text-foreground">{profile?.full_name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="font-medium text-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Phone
                    </label>
                    {isEditing ? (
                      <Input
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="mt-1"
                        placeholder="+254 700 000 000"
                      />
                    ) : (
                      <p className="font-medium text-foreground">
                        {profile?.phone || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    My Project Requests
                  </h2>
                  <Badge variant="outline">{quotes.length} Projects</Badge>
                </div>

                {isLoadingQuotes ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : quotes.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Submit your first project request to get started.
                    </p>
                    <Link to="/quote">
                      <Button variant="cta">
                        <Plus className="w-4 h-4" />
                        Submit Project Request
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quotes.map((quote) => (
                          <TableRow key={quote.id}>
                            <TableCell className="font-medium capitalize">
                              {quote.service_type.replace("-", " ")}
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {quote.project_description}
                            </TableCell>
                            <TableCell>{getStatusBadge(quote.status)}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(quote.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
